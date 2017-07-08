const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, './dist/js/'),
        filename: 'app.min.js',
        publicPath: './js/'
    },
    externals: {
        'handlebars': 'Handlebars'
    }
};