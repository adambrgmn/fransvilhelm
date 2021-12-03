#!/usr/bin/env node
const { build, ts, tsconfig, dirname, glob, log } = require('estrella');
const rimraf = require('rimraf');

const pkg = require('./package.json');

rimraf.sync('./dist');

let baseOptions = {
  entry: 'src/index.ts',
  bundle: true,
  minify: false,
  external: [
    ...Object.keys(pkg.dependencies),
    ...Object.keys(pkg.peerDependencies),
  ],
};

build({
  ...baseOptions,
  outfile: 'dist/index.js',
  format: 'esm',
  onEnd(config) {
    const dtsFilesOutdir = dirname(config.outfile);
    generateTypeDefs(tsconfig(config), config.entry, dtsFilesOutdir);
  },
});

build({
  ...baseOptions,
  outfile: 'dist/index.cjs.js',
  format: 'cjs',
});

function generateTypeDefs(tsconfig, entryfiles, outdir) {
  const filenames = Array.from(
    new Set(
      (Array.isArray(entryfiles) ? entryfiles : [entryfiles]).concat(
        tsconfig.include || [],
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

  program.emit(
    targetSourceFile,
    writeFile,
    cancellationToken,
    emitOnlyDtsFiles,
  );

  log.info('Wrote', glob(outdir + '/*.d.ts').join(', '));
}
