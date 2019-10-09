let babel = require('rollup-plugin-babel');

module.exports = {
    input: './src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'esm'
    },
    externals: ['preact'],
    plugins: [
        babel()
    ]
}