import fg from 'fast-glob';
import type { RollupOptions } from 'rollup';
import esbuild from 'rollup-plugin-esbuild';

const bundles: RollupOptions[] = [];

const utilities: string[] = fg
  .sync('src/*/index.ts')
  .map((entry) => entry.split('/')[1]);

for (const utility of utilities) {
  bundles.push({
    input: `src/${utility}/index.ts`,
    output: {
      file: `dist/${utility}/index.mjs`,
      format: 'es',
    },
    plugins: [esbuild()],
  });
}

// .mjs
bundles.push({
  input: 'src/index.ts',
  output: {
    file: 'index.mjs',
    format: 'es',
  },
  plugins: [esbuild()],
});

export default bundles;
