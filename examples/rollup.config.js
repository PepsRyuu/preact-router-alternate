let node_resolve = require('rollup-plugin-node-resolve');
let buble = require('rollup-plugin-buble');
let hotcss = require('rollup-plugin-hot-css');
let path = require('path');

let scss = (code, id) => {
    return require('node-sass').renderSync({
        data: code,
        compressed: true,
        includePaths: [ path.dirname(id) ]
    }).css.toString();
};

module.exports = {
    input: './src/main.js',
    experimentalCodeSplitting: true,
    output: {
        file: 'app.js',
        format: 'esm',
        assetFileNames: '[name][extname]'
    },
    plugins: [
        hotcss({
            hot: process.env.NODE_ENV !== 'production',
            filename: 'styles.css',
            transform: scss
        }),
        buble({
            jsx: 'h',
            objectAssign: 'Object.assign'
        }),
        node_resolve()
    ]
}