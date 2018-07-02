const path = require('path');

module.exports = [{
    mode: 'production',
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: 'index.js',
        path: path.resolve('./build')
    },
    module: {
        rules: [
            {
                test: /\.jsx/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}];
