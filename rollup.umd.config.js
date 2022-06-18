import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

export default {
    input: path.resolve(__dirname, './src/index.ts'),
    output: [
      {
        file: path.resolve(__dirname, 'dist/umd/index.js'),
        format: 'umd',
        // 这个name属性非常重要，是通过 cdn 引入后，挂载到 window上的属性名
        name: 'rain'
      }
    ],
    plugins: [
      esbuild({
        // 为了应对 umd 直接加载到浏览器里，构建目标需要设定得兼容性更强
        target: 'es2015'
      }),
      // 需要babel plugin
      babel({
        presets: ['@babel/preset-env'],
        exclude: 'node_modules/**',
        babelHelpers: 'bundled'
      }),
      nodeResolve(),
      json(),
      commonjs()
    ],
  };
  
  