"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initTransform = exports.initDirectory = exports.initConfig = exports.getPackageJson = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const semver_1 = __importDefault(require("semver"));
const recast = __importStar(require("recast"));
const package_json_1 = require("@hypermod/cli/package.json");
const package_json_2 = require("@hypermod/utils/package.json");
const TEMPLATE_PATH = path_1.default.join(__dirname, '..', 'template');
function getPackageJson(packageName, version = '0.0.0') {
    return JSON.stringify({
        name: packageName,
        version: version,
        license: 'MIT',
        source: 'src/hypermod.config.js',
        main: 'dist/hypermod.config.js',
        scripts: {
            dev: 'hypermod',
            build: 'parcel build',
            test: 'jest --watch',
            validate: 'hypermod validate .',
        },
        dependencies: {
            '@hypermod/utils': `^${package_json_2.version}`,
            jscodeshift: '^0.13.1',
        },
        devDependencies: {
            '@hypermod/cli': `^${package_json_1.version}`,
            '@types/jest': '^26.0.15',
            '@types/node': '^16.11.0',
            jest: '^26.6.0',
            parcel: '^2.8.3',
            prettier: '^2.0.0',
            'ts-jest': '^26.4.4',
            typescript: '^4.5.5',
        },
    }, null, 2);
}
exports.getPackageJson = getPackageJson;
function getNpmIgnore() {
    return `src/
codemods/
**/__test__
**/*.spec.(ts|js)
.vscode
jest.config.js
`;
}
function getConfig(packageName, transform, preset) {
    return `module.exports = {
  maintainers: [],
  targets: [],
  description: 'Codemods for ${packageName}',
  transforms: {${transform ? `'${transform}': require('./${transform}/transform'),` : ''}},
  presets: {${preset ? `'${preset}': require('./${preset}/transform'),` : ''}},
};
`;
}
function updateConfig(targetPath, packageName, transformName, type) {
    const configPath = path_1.default.join(targetPath, 'hypermod.config.js');
    const source = fs_extra_1.default.readFileSync(configPath, 'utf8');
    const ast = recast.parse(source);
    const b = recast.types.builders;
    const key = type === 'version' ? 'transforms' : 'presets';
    recast.visit(ast, {
        visitProperty(propertyPath) {
            // @ts-ignore
            if (propertyPath.node.key.name !== key)
                return false;
            // @ts-ignore
            const properties = propertyPath.node.value.properties;
            // @ts-ignore
            properties.forEach(property => {
                if (property.key.value === transformName) {
                    throw new Error(`Transform for ${packageName} ${transformName} already exists`);
                }
            });
            const transformPath = `./${transformName}/transform`;
            properties.push(b.property('init', b.stringLiteral(transformName), b.callExpression(b.identifier('require'), [
                b.stringLiteral(transformPath),
            ])));
            return false;
        },
    });
    fs_extra_1.default.writeFileSync(configPath, recast.prettyPrint(ast, {
        quote: 'single',
        trailingComma: true,
        tabWidth: 2,
    }).code);
}
function initConfig(packageName, targetPath = './') {
    const configPath = path_1.default.join(targetPath, 'hypermod.config.js');
    if (!fs_extra_1.default.existsSync(configPath)) {
        fs_extra_1.default.mkdirSync(targetPath, { recursive: true });
        fs_extra_1.default.writeFileSync(configPath, getConfig(packageName));
    }
}
exports.initConfig = initConfig;
function initDirectory(packageName, targetPath = './', isReduced = false) {
    if (!fs_extra_1.default.existsSync(targetPath)) {
        fs_extra_1.default.mkdirSync(targetPath);
    }
    fs_extra_1.default.writeFileSync(path_1.default.join(targetPath, 'package.json'), getPackageJson(isReduced
        ? `@hypermod/mod-${packageName.replace('/', '__').replace('@', '')}`
        : packageName));
    if (!isReduced) {
        fs_extra_1.default.copySync(path_1.default.join(TEMPLATE_PATH), targetPath, {
            filter: src => !src.includes('/codemods'),
        });
        fs_extra_1.default.writeFileSync(path_1.default.join(targetPath, '.npmignore'), getNpmIgnore());
        const readmeFilePath = path_1.default.join(targetPath, 'README.md');
        const readmeFile = fs_extra_1.default
            .readFileSync(readmeFilePath, 'utf8')
            .replace('<% packageName %>', packageName);
        fs_extra_1.default.writeFileSync(readmeFilePath, readmeFile);
    }
    initConfig(packageName, path_1.default.join(targetPath, 'src'));
}
exports.initDirectory = initDirectory;
function initTransform(packageName, id, type, targetPath = './') {
    if (type === 'version' && !semver_1.default.valid(id)) {
        throw new Error(`Provided version ${id} is not a valid semver version`);
    }
    const sourcePath = path_1.default.join(targetPath, 'src');
    const transformPath = path_1.default.join(sourcePath, id);
    if (fs_extra_1.default.existsSync(transformPath)) {
        throw new Error(`Codemod for ${type} "${id}" already exists`);
    }
    const destinationPath = path_1.default.join(sourcePath, 'codemod');
    fs_extra_1.default.copySync(path_1.default.join(TEMPLATE_PATH, 'codemods', 'codemod'), destinationPath);
    fs_extra_1.default.renameSync(destinationPath, transformPath);
    const testFilePath = path_1.default.join(transformPath, 'transform.spec.ts');
    const testFile = fs_extra_1.default
        .readFileSync(testFilePath, 'utf8')
        .replace(new RegExp('<% packageName %>', 'g'), packageName)
        .replace(new RegExp('<% seperator %>', 'g'), type === 'version' ? '@' : '#')
        .replace(new RegExp('<% transform %>', 'g'), id || '');
    fs_extra_1.default.writeFileSync(testFilePath, testFile);
    const readmeFilePath = path_1.default.join(transformPath, 'README.md');
    const readmeFile = fs_extra_1.default
        .readFileSync(readmeFilePath, 'utf8')
        .replace(new RegExp('<% packageName %>', 'g'), packageName)
        .replace(new RegExp('<% seperator %>', 'g'), type === 'version' ? '@' : '#')
        .replace(new RegExp('<% transform %>', 'g'), id || '');
    fs_extra_1.default.writeFileSync(readmeFilePath, readmeFile);
    updateConfig(sourcePath, packageName, id || '', type);
}
exports.initTransform = initTransform;
