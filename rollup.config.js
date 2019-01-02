let buble = require('rollup-plugin-buble');

module.exports = {
    input: './src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'esm'
    },
    externals: ['preact'],
    plugins: [
        buble({
            jsx: 'h',
            objectAssign: 'Object.assign'
        })
    ]
}