let node_resolve = require('rollup-plugin-node-resolve');
let babel = require('rollup-plugin-babel');
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
        babel(),
        node_resolve()
    ]
}