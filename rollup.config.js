import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import url from '@rollup/plugin-url';
import svelte from 'rollup-plugin-svelte';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import module from 'module'

import sapperEnv from 'sapper-environment'
import svelteImage from 'svelte-image'
import nib from 'nib'

import { rootpath, mode, dev, legacy } from './svelte.config.mjs'
console.log(`MODE: 【${mode}】`)

const preprocess = [
  svelteImage({}),
  sveltePreprocess({
    sourceMap: dev,

    style: ({ content, markup, attributes, filename }) => {
      return {
        code:
          content != null
            ? content
                // svelte compiler no like old ie crap
                .replace(/filter: alpha\(opacity=\d+\);?/g, '')
                // no idea wtf this is, but delete it...
                .replace(/filter: progid:DXImageTransform\.Microsoft\.gradient\(enabled = false\);/g, '')
            : null,
        dependencies: [filename],
      }
    },
    stylus: {
      use: [nib()]
    }
  }),
]

const onwarn = (warning, onwarn) => {
  return (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
  (warning.code === 'THIS_IS_UNDEFINED') ||
  onwarn(warning)
}

const svelteOnWarn = (warning, onwarn) => {
  const { code } = warning
  if (code === "css-unused-selector") return
  onwarn(warning)
}

export default {
  client: {
    input: config.client.input().replace(/\.js$/, '.ts'),
    output: config.client.output(),
    plugins: [
      replace({
        preventAssignment: true,
        values:{
          ...sapperEnv(),
          'process.browser': true,
          'process.env.NODE_ENV': JSON.stringify(mode)
        },
      }),
      svelte({
        preprocess,
        compilerOptions: {
          dev,
          hydratable: true
        },
        onwarn: svelteOnWarn
      }),
      url({
        sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
        publicPath: `${rootpath}/client/`
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),
      typescript({ sourceMap: dev }),

      legacy && babel({
        extensions: ['.js', '.mjs', '.html', '.svelte'],
        babelHelpers: 'runtime',
        exclude: ['node_modules/@babel/**'],
        presets: [
          ['@babel/preset-env', {
            targets: '> 0.25%, not dead'
          }]
        ],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          ['@babel/plugin-transform-runtime', {
            useESModules: true
          }]
        ]
      }),

      !dev && terser({
        module: true
      })
    ],
    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: { server: config.server.input().server.replace(/\.js$/, ".ts") },
    output: config.server.output(),
    plugins: [
      replace({
        preventAssignment: true,
        values:{
          ...sapperEnv(),
          'process.browser': false,
          'process.env.NODE_ENV': JSON.stringify(mode)
        },
      }),
      svelte({
        preprocess,
        compilerOptions: {
          dev,
          generate: 'ssr',
          hydratable: true
        },
        emitCss: false
      }),
      url({
        sourceDir: path.resolve(__dirname, 'src/node_modules/images'),
        publicPath: `${rootpath}/client/`,
        emitFiles: false // already emitted by client build
      }),
      resolve({
        dedupe: ['svelte']
      }),
      commonjs(),
      typescript({ sourceMap: dev })
    ],
    // external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),
    external: Object.keys(pkg.dependencies).concat(module.builtinModules),
    preserveEntrySignatures: 'strict',
    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input().replace(/\.js$/, '.ts'),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        preventAssignment: true,
        values:{
          'process.browser': true,
          'process.env.NODE_ENV': JSON.stringify(mode)
        },
      }),
      commonjs(),
      typescript({ sourceMap: dev }),
      !dev && terser()
    ],
    preserveEntrySignatures: false,
    onwarn,
  }
};
