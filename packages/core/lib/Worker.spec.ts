/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

import path from 'path';
import fs from 'fs';
// @ts-expect-error
import mkdirp from 'mkdirp';
// @ts-expect-error
import temp from 'temp';

function renameFileTo(oldPath: string, newFilename: string) {
  const projectPath = path.dirname(oldPath);
  const newPath = path.join(projectPath, newFilename);
  mkdirp.sync(path.dirname(newPath));
  fs.renameSync(oldPath, newPath);
  return newPath;
}

function createTempFileWith(
  content: string,
  filename?: string,
  extension?: string,
) {
  const info = temp.openSync({ suffix: extension });
  let filePath = info.path;
  fs.writeSync(info.fd, content);
  fs.closeSync(info.fd);
  if (filename) {
    filePath = renameFileTo(filePath, filename);
  }
  return filePath;
}

// Test transform files need a js extension to work with @babel/register
// .ts or .tsx work as well
function createTransformWith(content: string, ext = '.js') {
  return createTempFileWith(
    'module.exports = function(fileInfo, api, options) { ' + content + ' }',
    undefined,
    ext,
  );
}

function getFileContent(filePath: string) {
  return fs.readFileSync(filePath).toString();
}

describe('Worker API', () => {
  it('transforms files', async () => {
    // @ts-expect-error
    const worker = await import('./Worker.js');
    const transformPath = createTransformWith(
      'return fileInfo.source + " changed";',
    );
    const sourcePath = createTempFileWith('foo');
    const emitter = worker([transformPath]);

    emitter.send({ files: [sourcePath] });
    emitter.once('message', (data: any) => {
      expect(data.status).toBe('ok');
      expect(data.msg).toBe(sourcePath);
      expect(getFileContent(sourcePath)).toBe('foo changed');
    });
  });

  it('transforms files with tranformId as extension', async () => {
    // @ts-expect-error
    const worker = await import('./Worker.js');
    const configPath = createTempFileWith(
      `
  const transfomer = (fileInfo) => fileInfo.source + " changed";
  module.exports = { transforms: { "1.0.0": transfomer } };
  `,
      'codeshift1.config.js',
      '.js',
    );
    const sourcePath = createTempFileWith('foo');
    const emitter = worker([configPath + '@1.0.0']);

    emitter.send({ files: [sourcePath] });
    emitter.once('message', (data: any) => {
      expect(data.status).toBe('ok');
      expect(data.msg).toBe(sourcePath);
      expect(getFileContent(sourcePath)).toBe('foo changed');
    });
  });

  it('transforms files with presetId as extension', async () => {
    // @ts-expect-error
    const worker = await import('./Worker.js');
    const configPath = createTempFileWith(
      `
  const transfomer = (fileInfo) => fileInfo.source + " changed";
  module.exports = { presets: { "my-preset": transfomer } };
  `,
      'codeshift2.config.js',
      '.js',
    );
    const sourcePath = createTempFileWith('foo');
    const emitter = worker([configPath + '#my-preset']);

    emitter.send({ files: [sourcePath] });
    emitter.once('message', (data: any) => {
      expect(data.status).toBe('ok');
      expect(data.msg).toBe(sourcePath);
      expect(getFileContent(sourcePath)).toBe('foo changed');
    });
  });

  it('passes j as argument', async () => {
    // @ts-expect-error
    const worker = await import('./Worker.js');
    const transformPath = createTempFileWith(
      `module.exports = function (file, api) {
        return api.j(file.source).toSource() + ' changed';
       }`,
    );
    const sourcePath = createTempFileWith('const x = 10;');

    const emitter = worker([transformPath]);
    emitter.send({ files: [sourcePath] });
    emitter.once('message', (data: any) => {
      expect(data.status).toBe('ok');
      expect(getFileContent(sourcePath)).toBe('const x = 10;' + ' changed');
    });
  });

  describe('custom parser', () => {
    function getTransformForParser(parser: string) {
      return createTempFileWith(
        `function transform(fileInfo, api) {
          api.jscodeshift(fileInfo.source);
          return "changed";
         }
         ${parser ? `transform.parser = '${parser}';` : ''}
         module.exports = transform;
        `,
      );
    }
    function getSourceFile() {
      // This code cannot be parsed by Babel v5
      return createTempFileWith('const x = (a: Object, b: string): void => {}');
    }

    it('errors if new flow type code is parsed with babel v5', async () => {
      // @ts-expect-error
      const worker = await import('./Worker.js');
      const transformPath = createTransformWith(
        'api.jscodeshift(fileInfo.source); return "changed";',
      );
      const sourcePath = getSourceFile();
      const emitter = worker([transformPath]);

      emitter.send({ files: [sourcePath] });
      emitter.once('message', (data: any) => {
        expect(data.status).toBe('error');
        expect(data.msg).toMatch('SyntaxError');
      });
    });

    ['flow', 'babylon'].forEach(parser => {
      it(`uses ${parser} if configured as such`, async () => {
        // @ts-expect-error
        const worker = await import('./Worker.js');
        const transformPath = getTransformForParser(parser);
        const sourcePath = getSourceFile();
        const emitter = worker([transformPath]);

        emitter.send({ files: [sourcePath] });
        emitter.once('message', (data: any) => {
          expect(data.status).toBe('ok');
          expect(getFileContent(sourcePath)).toBe('changed');
        });
      });
    });

    ['babylon', 'flow', 'tsx'].forEach(parser => {
      it(`can parse JSX with ${parser}`, async () => {
        // @ts-expect-error
        const worker = await import('./Worker.js');
        const transformPath = getTransformForParser(parser);
        const sourcePath = createTempFileWith(
          'var component = <div>{foobar}</div>;',
        );
        const emitter = worker([transformPath]);

        emitter.send({ files: [sourcePath] });
        emitter.once('message', (data: any) => {
          expect(data.status).toBe('ok');
          expect(getFileContent(sourcePath)).toBe('changed');
        });
      });
    });

    it('can parse enums with flow', async () => {
      // @ts-expect-error
      const worker = await import('./Worker.js');
      const transformPath = getTransformForParser('flow');
      const sourcePath = createTempFileWith('enum E {A, B}');
      const emitter = worker([transformPath]);

      emitter.send({ files: [sourcePath] });
      emitter.once('message', (data: any) => {
        expect(data.status).toBe('ok');
        expect(getFileContent(sourcePath)).toBe('changed');
      });
    });
  });
});
