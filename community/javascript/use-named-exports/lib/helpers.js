const once = fn => {
  const lock = { enabled: false };
  return j => {
    if (lock.enabled) return;
    lock.enabled = true;
    fn(j);
  };
};

export const extendApi = once(j => {
  const isTopLevel = path => path.parent.value.type === 'Program';
  j.registerMethods({
    getExportsByClassName(className) {
      return this.find(j.ExportNamedDeclaration, {
        declaration: {
          type: 'ClassDeclaration',
          id: { type: 'Identifier', name: className },
        },
      });
    },
    getExportsByFunctionName(className) {
      return this.find(j.ExportNamedDeclaration, {
        declaration: {
          type: 'FunctionDeclaration',
          id: { type: 'Identifier', name: className },
        },
      });
    },
    getExportsByVarName(varName) {
      return this.find(j.ExportNamedDeclaration, {
        declaration: {
          type: 'VariableDeclaration',
          declarations: [
            {
              type: 'VariableDeclarator',
              id: { type: 'Identifier', name: varName },
            },
          ],
        },
      });
    },
    getImportsByPackageName(packageName) {
      return this.find(j.ImportDeclaration, {
        source: {
          value: packageName,
        },
      });
    },
    getNamedExportedClasses() {
      return this.find(j.ExportNamedDeclaration, {
        declaration: { type: 'ClassDeclaration', id: { type: 'Identifier' } },
      });
    },
    getNamedExportedFunctions() {
      return this.find(j.ExportNamedDeclaration, {
        declaration: {
          type: 'FunctionDeclaration',
          id: { type: 'Identifier' },
        },
      });
    },
    getNamedExportedVars() {
      return this.find(j.ExportNamedDeclaration, {
        declaration: { type: 'VariableDeclaration' },
      });
    },
    getTopLevelClasses() {
      return this.find(j.ClassDeclaration).filter(isTopLevel);
    },
    getTopLevelFunctions() {
      return this.find(j.FunctionDeclaration).filter(isTopLevel);
    },
    getTopLevelVariables() {
      return this.find(j.VariableDeclaration).filter(isTopLevel);
    },
    getTopLevelClassByName(className) {
      return this.find(j.ClassDeclaration, {
        id: { type: 'Identifier', name: className },
      }).filter(isTopLevel);
    },
    getTopLevelFunctionByName(className) {
      return this.find(j.FunctionDeclaration, {
        id: { type: 'Identifier', name: className },
      }).filter(isTopLevel);
    },
    getTopLevelVariableByName(varName) {
      return this.find(j.VariableDeclaration, {
        declarations: [
          {
            type: 'VariableDeclarator',
            id: { type: 'Identifier', name: varName },
          },
        ],
      }).filter(isTopLevel);
    },
    getImportedVarNames() {
      const identifiers = [];
      this.find(j.ImportDeclaration).forEach(path => {
        const importDeclaration = path.value;
        importDeclaration.specifiers.forEach(specifier => {
          identifiers.push(specifier.local.name);
        });
      });
      return identifiers;
    },
    getNamedExportedClassNames() {
      const identifiers = [];
      this.getNamedExportedClasses().forEach(path => {
        const exportNamedDeclaration = path.value;
        identifiers.push(exportNamedDeclaration.declaration.id.name);
      });
      return identifiers;
    },
    getNamedExportedFunctionNames() {
      const identifiers = [];
      this.getNamedExportedFunctions().forEach(path => {
        const exportNamedDeclaration = path.value;
        identifiers.push(exportNamedDeclaration.declaration.id.name);
      });
      return identifiers;
    },
    getNamedExportedVarNames() {
      const identifiers = [];
      this.getNamedExportedVars().forEach(path => {
        const exportNamedDeclaration = path.value;
        exportNamedDeclaration.declaration.declarations.forEach(declaration => {
          identifiers.push(declaration.id.name);
        });
      });
      return identifiers;
    },
    getTopLevelClassNames() {
      const identifiers = [];
      this.getTopLevelClasses().forEach(path => {
        const classDeclaration = path.value;
        identifiers.push(classDeclaration.id.name);
      });
      return identifiers;
    },
    getTopLevelFunctionNames() {
      const identifiers = [];
      this.getTopLevelFunctions().forEach(path => {
        const functionDeclaration = path.value;
        identifiers.push(functionDeclaration.id.name);
      });
      return identifiers;
    },
    getTopLevelVariableNames() {
      const identifiers = [];
      this.getTopLevelVariables().forEach(path => {
        const variableDeclaration = path.value;
        variableDeclaration.declarations.forEach(declaration => {
          identifiers.push(declaration.id.name);
        });
      });
      return identifiers;
    },
    getTopLevelVarNames() {
      return [].concat(
        this.getImportedVarNames(),
        this.getNamedExportedClassNames(),
        this.getNamedExportedFunctionNames(),
        this.getNamedExportedVarNames(),
        this.getTopLevelClassNames(),
        this.getTopLevelFunctionNames(),
        this.getTopLevelVariableNames(),
      );
    },
    exportClass(path) {
      const classDeclaration = path.value;
      return j.exportNamedDeclaration(
        j.classDeclaration(
          j.identifier(classDeclaration.id.name),
          classDeclaration.body,
          classDeclaration.superClass,
        ),
      );
    },
    exportDefaultAsNamed(path, name) {
      const exportDefaultDeclaration = path.value;
      const varName = j.identifier(name);
      const varValue = exportDefaultDeclaration.declaration;
      return j.exportNamedDeclaration(
        j.variableDeclaration('const', [
          j.variableDeclarator(varName, varValue),
        ]),
      );
    },
    exportVarNameAsDefault(name) {
      return j.exportDefaultDeclaration(j.identifier(name));
    },
    exportFunction(path) {
      const functionDeclaration = path.value;
      return j.exportNamedDeclaration(
        j.functionDeclaration(
          j.identifier(functionDeclaration.id.name),
          functionDeclaration.params,
          functionDeclaration.body,
        ),
      );
    },
    exportVariable(path) {
      const variableDeclaration = path.value;
      return j.exportNamedDeclaration(
        j.variableDeclaration('const', variableDeclaration.declarations),
      );
    },
  });
});
