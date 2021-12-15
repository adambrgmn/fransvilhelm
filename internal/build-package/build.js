#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const { build, ts, tsconfig, dirname, log } = require('estrella');
const rimraf = require('rimraf');
const { DiagnosticCategory } = require('typescript');

let cwd = process.cwd();
let relative = (...fragments) => path.join(cwd, ...fragments);
let pkg = readJson(relative('./package.json'));

rimraf.sync(relative('./dist'));

let baseOptions = {
  entry: relative('src/index.ts'),
  bundle: true,
  minify: false,
  external: [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ],
};

build({
  ...baseOptions,
  outfile: relative('dist/index.mjs'),
  format: 'esm',
  onEnd(config) {
    const dtsFilesOutdir = dirname(config.outfile);
    generateTypeDefs(tsconfig(config), config.entry, dtsFilesOutdir);
  },
});

build({
  ...baseOptions,
  outfile: relative('dist/index.cjs'),
  format: 'cjs',
});

function generateTypeDefs(tsconfig, entryfiles, outdir) {
  let filenames = Array.from(
    new Set(
      (Array.isArray(entryfiles) ? entryfiles : [entryfiles]).concat(
        tsconfig.include || [],
        ['src/env.d.ts'],
      ),
    ),
  ).filter((v) => v);

  log.info('Generating type declaration files for', filenames.join(', '));

  let compilerOptions = {
    ...tsconfig.compilerOptions,
    moduleResolution: undefined,
    declaration: true,
    outDir: outdir,
    noEmit: false,
  };

  let program = ts.ts.createProgram(filenames, compilerOptions);
  let targetSourceFile = undefined;
  let writeFile = undefined;
  let cancellationToken = undefined;
  let emitOnlyDtsFiles = true;

  let result = program.emit(
    targetSourceFile,
    writeFile,
    cancellationToken,
    emitOnlyDtsFiles,
  );

  for (let diagnose of result.diagnostics) {
    let file = diagnose.file;
    log.error(`${file.fileName}`);
    log.error(diagnose.messageText + '\n');
  }

  let hasError = result.diagnostics.some(
    (diagnostic) => diagnostic.category === DiagnosticCategory.Error,
  );

  if (hasError) {
    throw new Error('TS build failed');
  }
}

function readJson(file) {
  let content = fs.readFileSync(file, 'utf-8');
  return JSON.parse(content);
}
