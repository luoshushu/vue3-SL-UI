import esbuild from 'rollup-plugin-esbuild'
import vue from '@vitejs/plugin-vue' // 把vue文件转成js
import scss from 'rollup-plugin-scss' // 把scss结尾的文件转成css
import dartSass from 'sass';
import { terser } from "rollup-plugin-terser"

export default {
  input: 'src/lib/index.ts', //输入文件
  output: [{
    globals: {
      vue: 'Vue'
    },
    name: 'SL',
    file: 'dist/lib/SL.js',
    format: 'umd',
    plugins: [terser()] //丑化js
  }, {
    name: 'SL',
    file: 'dist/lib/SL.esm.js',
    format: 'es',
    plugins: [terser()]
  }],
  plugins: [
    scss({ include: /\.scss$/, sass: dartSass }),
    esbuild({
      include: /\.[jt]s$/,
      minify: process.env.NODE_ENV === 'production',
      target: 'es2015' 
    }),
    vue({
      include: /\.vue$/,
    })
  ],
}