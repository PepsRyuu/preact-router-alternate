process.env.NODE_ENV = 'development';

let express = require('express');
let fallback = require('express-history-api-fallback');
let config = require(process.cwd() + '/rollup.config.js');
let nollupDevServer = require('nollup/lib/dev-middleware');
let app = express();
let path = require('path');

app.use(nollupDevServer(app, config, {
    watch: path.resolve(__dirname, '../'),
    hot: true,
    verbose: false
}));

app.use(express.static('./'));
app.use(express.static('./public'));
app.use(fallback('index.html', { root: './public' }));
app.listen(9001);

console.log('Listening on http://localhost:9001');
