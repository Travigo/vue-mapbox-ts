// import typescript from 'rollup-plugin-typescript';
import typescript from "@rollup/plugin-typescript"
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
// import sass from 'rollup-plugin-sass';
import packageJson from './package.json';
import copy from 'rollup-plugin-copy';
import css from "rollup-plugin-css-only";
import pug from "rollup-plugin-pug"

export default [
    {
        input: './src/index.ts',
        output: {
            format: 'esm',
            file: packageJson.module,
            sourcemap: true
        },
        plugins: [
            pug(),
            vue({
                preprocessStyles: true,
                css: false,
                compileTemplate: true,
            }),
            
            typescript(),
            resolve(),
            peerDepsExternal(),
            css(),
            // sass(),
            // copy({
            //     targets: [
            //         { src: 'src/sass', dest: 'lib' },
            //     ]
            // }),
        ]
    },
];