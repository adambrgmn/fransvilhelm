#!/usr/bin/env node
const path = require('path');

const { build, ts, tsconfig, dirname, log } = require('estrella');
const rimraf = require('rimraf');
const { DiagnosticCategory } = require('typescript');

const pkg = require('./package.json');

rimraf.sync(path.join(__dirname, './dist'));

let baseOptions = {
  entry: path.join(__dirname, 'src/index.ts'),
  bundle: true,
  minify: false,
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
  ],
};

build({
  ...baseOptions,
  outfile: path.join(__dirname, 'dist/index.js'),
  format: 'esm',
  onEnd(config) {
    const dtsFilesOutdir = dirname(config.outfile);
    generateTypeDefs(tsconfig(config), config.entry, dtsFilesOutdir);
  },
});

build({
  ...baseOptions,
  outfile: path.join(__dirname, 'dist/index.cjs.js'),
  format: 'cjs',
});

function generateTypeDefs(tsconfig, entryfiles, outdir) {
  const filenames = Array.from(
    new Set(
      (Array.isArray(entryfiles) ? entryfiles : [entryfiles]).concat(
        tsconfig.include || [],
        ['src/env.d.ts'],
      ),
    ),
  ).filter((v) => v);

  log.info('Generating type declaration files for', filenames.join(', '));

  const compilerOptions = {
    ...tsconfig.compilerOptions,
    moduleResolution: undefined,
    declaration: true,
    outDir: outdir,
    noEmit: false,
  };

  const program = ts.ts.createProgram(filenames, compilerOptions);
  const targetSourceFile = undefined;
  const writeFile = undefined;
  const cancellationToken = undefined;
  const emitOnlyDtsFiles = true;

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
