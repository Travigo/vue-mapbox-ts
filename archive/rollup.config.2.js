import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import css from 'rollup-plugin-css-only';
import pug from 'rollup-plugin-pug';

import packageJson from './package.json';


export default {
  input: 'src/index.ts',
  external: [ 'vue' ],
  output: [
    {
      format: 'cjs',
      file: packageJson.main,
      sourcemap: true,
      exports: 'named',
      globals: { Vue: 'vue' }
    },
    {
      format: 'esm',
      file: packageJson.module,
      sourcemap: true,
      exports: 'named',
      globals: { Vue: 'vue' }
    }
  ],

  plugins: [
    peerDepsExternal(), 
    resolve(), 
    commonjs(),    
    vue({
      preprocessStyles: true,
      plugins: ['pug'],
    }),
    // pug(),    
    css(),
    typescript({ tsconfig: 'tsconfig.json' }), 
  ]
};
