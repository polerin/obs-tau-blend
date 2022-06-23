/* eslint-disable import/no-extraneous-dependencies */

const esbuild = require('esbuild');

const pkg = require('./package.json');

const commons = {
  entryPoints: ['./src/index.ts'],
  bundle: true,
  platform: 'browser',
  sourcemap: true,
  external: Object.keys(pkg.dependencies)
};

esbuild.build({
  ...commons,
  outfile: pkg.main,
  format: 'cjs',
  target: 'es2020',
});

esbuild.build({
  ...commons,
  outfile: pkg.module,
  format: 'esm',
  target: 'es2020',
});

esbuild.build({
  ...commons,
  outfile: pkg.esnext,
  format: 'esm',
  target: 'esnext',
});