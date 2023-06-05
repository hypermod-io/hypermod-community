import child_process from 'child_process';
import chalk from 'chalk';
import fs from 'graceful-fs';
import path from 'path';
import os from 'os';
// @ts-expect-error
import ignores from 'jscodeshift/src/ignoreFiles';

import { Message, Flags, Statuses } from './types';

type FileCounters = Record<Statuses, number>;
type Stats = Record<string, number>;

const availableCpus = Math.max(os.cpus().length - 1, 1);
const CHUNK_SIZE = 50;

function lineBreak(str: string) {
  return /\n$/.test(str) ? str : str + '\n';
}

const bufferedWrite = (function () {
  const buffer: string[] = [];
  let buffering = false;

  process.stdout.on('drain', () => {
    if (!buffering) return;
    // @ts-expect-error
    while (buffer.length > 0 && process.stdout.write(buffer.shift()) !== false);
    if (buffer.length === 0) {
      buffering = false;
    }
  });
  return function write(msg: string) {
    if (buffering) {
      buffer.push(msg);
    }
    if (process.stdout.write(msg) === false) {
      buffering = true;
    }
  };
})();

const log: Record<string, (msg: string, verbose: Flags['verbose']) => void> = {
  ok(msg, verbose = 0) {
    verbose >= 2 && bufferedWrite(chalk.white.bgGreen(' OKK ') + msg);
  },
  nochange(msg, verbose = 0) {
    verbose >= 1 && bufferedWrite(chalk.white.bgYellow(' NOC ') + msg);
  },
  skip(msg, verbose = 0) {
    verbose >= 1 && bufferedWrite(chalk.white.bgYellow(' SKIP ') + msg);
  },
  error(msg, verbose = 0) {
    verbose >= 0 && bufferedWrite(chalk.white.bgRed(' ERR ') + msg);
  },
};

function showFileStats(fileStats: FileCounters) {
  process.stdout.write(
    'Results: \n' +
      chalk.red(fileStats.error + ' errors\n') +
      chalk.yellow(fileStats.nochange + ' unmodified\n') +
      chalk.yellow(fileStats.skip + ' skipped\n') +
      chalk.green(fileStats.ok + ' ok\n'),
  );
}

function showStats(stats: Stats) {
  const names = Object.keys(stats).sort();
  if (names.length) {
    process.stdout.write(chalk.blue('Stats: \n'));
  }
  names.forEach(name => process.stdout.write(name + ': ' + stats[name] + '\n'));
}

function dirFiles(
  dir: string,
  callback: (files: string[]) => void,
  // acc stores files found so far and counts remaining paths to be processed
  acc: { files: string[]; remaining: number } = { files: [], remaining: 1 },
) {
  function done() {
    // decrement count and return if there are no more paths left to process
    if (!--acc.remaining) {
      callback(acc.files);
    }
  }

  fs.readdir(dir, (err, files) => {
    // if dir does not exist or is not a directory, bail
    // (this should not happen as long as calls do the necessary checks)
    if (err) throw err;

    acc.remaining += files.length;
    files.forEach(file => {
      const name = path.join(dir, file);
      fs.stat(name, (err, stats) => {
        if (err) {
          // probably a symlink issue
          process.stdout.write(
            'Skipping path "' + name + '" which does not exist.\n',
          );
          done();
        } else if (ignores.shouldIgnore(name)) {
          // ignore the path
          done();
        } else if (stats.isDirectory()) {
          dirFiles(name + '/', callback, acc);
        } else {
          acc.files.push(name);
          done();
        }
      });
    });
    done();
  });
}

function getAllFiles(paths: string[], filter: (name: string) => boolean) {
  return Promise.all(
    paths.map(
      file =>
        new Promise(resolve => {
          fs.lstat(file, (err, stat) => {
            if (err) {
              process.stderr.write(
                'Skipping path ' + file + ' which does not exist. \n',
              );
              resolve([]);
              return;
            }

            if (stat.isDirectory()) {
              dirFiles(file, list => resolve(list.filter(filter)));
            } else if (ignores.shouldIgnore(file)) {
              // ignoring the file
              resolve([]);
            } else {
              resolve([file]);
            }
          });
        }),
    ),
  ).then(arrays => {
    const result = [];
    for (const array of arrays) {
      // @ts-expect-error
      for (const element of array) {
        result.push(element);
      }
    }
    return result;
  });
}

export function run(entrypointPath: string, paths: string[], options: Flags) {
  const cpus = options.cpus
    ? Math.min(availableCpus, options.cpus)
    : availableCpus;
  const extensions =
    options.extensions && options.extensions.split(',').map(ext => '.' + ext);
  const fileCounters: FileCounters = { error: 0, ok: 0, nochange: 0, skip: 0 };
  const statsCounter: Stats = {};
  const startTime = process.hrtime();

  ignores.add(options.ignorePattern);
  ignores.addFromFile(options.ignoreConfig);

  if (!fs.existsSync(entrypointPath)) {
    process.stderr.write(
      chalk.white.bgRed('ERROR') +
        ' Transform file ' +
        entrypointPath +
        ' does not exist \n',
    );
    return;
  }

  return getAllFiles(
    paths,
    (name: string) =>
      !extensions || extensions.indexOf(path.extname(name)) != -1,
  )
    .then(files => {
      const numFiles = files.length;

      if (numFiles === 0) {
        process.stdout.write('No files selected, nothing to do. \n');
        return [];
      }

      const processes = options.runInBand ? 1 : Math.min(numFiles, cpus);
      const chunkSize =
        processes > 1
          ? Math.min(Math.ceil(numFiles / processes), CHUNK_SIZE)
          : numFiles;

      let index = 0;
      // return the next chunk of work for a free worker
      function next() {
        if (!options.silent && !options.runInBand && index < numFiles) {
          process.stdout.write(
            'Sending ' +
              Math.min(chunkSize, numFiles - index) +
              ' files to free worker...\n',
          );
        }
        return files.slice(index, (index += chunkSize));
      }

      if (!options.silent) {
        process.stdout.write('Processing ' + files.length + ' files... \n');
        if (!options.runInBand) {
          process.stdout.write('Spawning ' + processes + ' workers...\n');
        }
        if (options.dry) {
          process.stdout.write(
            chalk.green('Running in dry mode, no files will be written! \n'),
          );
        }
      }

      const args = [entrypointPath, options.babel ? 'babel' : 'no-babel'];

      const workers = [];

      for (let i = 0; i < processes; i++) {
        workers.push(
          options.runInBand
            ? // eslint-disable-next-line @typescript-eslint/no-var-requires
              require('../lib/Worker')(args)
            : child_process.fork(
                path.join(__dirname, '..', 'lib', 'Worker.js'),
                args,
              ),
        );
      }

      return workers.map(child => {
        child.send({ files: next(), options });
        child.on('message', (message: Message) => {
          switch (message.action) {
            case 'status':
              fileCounters[message.status] += 1;
              log[message.status](lineBreak(message.msg), options.verbose);
              break;
            case 'update':
              if (!statsCounter[message.name]) {
                statsCounter[message.name] = 0;
              }
              statsCounter[message.name] += message.quantity;
              break;
            case 'free':
              child.send({ files: next(), options });
              break;
            case 'report':
              bufferedWrite(
                lineBreak(
                  `${chalk.white.bgBlue(' REP ')}${message.file} ${
                    message.msg
                  }`,
                ),
              );
              break;
          }
        });
        return new Promise(resolve => child.on('disconnect', resolve));
      });
    })
    .then(pendingWorkers =>
      Promise.all(pendingWorkers).then(() => {
        const endTime = process.hrtime(startTime);
        const timeElapsed = (endTime[0] + endTime[1] / 1e9).toFixed(3);
        if (!options.silent) {
          process.stdout.write('All done. \n');
          showFileStats(fileCounters);
          showStats(statsCounter);
          process.stdout.write('Time elapsed: ' + timeElapsed + 'seconds \n');

          if (options.failOnError && fileCounters.error > 0) {
            process.exit(1);
          }
        }

        return Object.assign(
          {
            stats: statsCounter,
            timeElapsed: timeElapsed,
          },
          fileCounters,
        );
      }),
    );
}
