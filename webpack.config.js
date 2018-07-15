const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { readdirSync } = require('fs')
const { webpack: lernaAliases } = require('lerna-alias')

const PACKAGE_PATH = './packages';

const getEntryConfiguration = ({ packagesPath }) => {
    const entry = {};

    readdirSync(packagesPath).forEach(directoryName => {
        entry[directoryName] = `${packagesPath}/${directoryName}/src/index.js`;
    });

    return entry;
};

module.exports = {
    plugins: [
        new ProgressBarPlugin()
    ],
    mode: 'production',
    entry: getEntryConfiguration({ packagesPath: PACKAGE_PATH }),
    output: {
        path: path.join(__dirname, ''),
        filename: `${PACKAGE_PATH}/[name]/build/index.bundle.js`
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], 
        modules: ['node_modules'],
        alias: lernaAliases(),
    },
    externals: [
        'firebase-admin',
        'firebase-functions',
        'xmlhttprequest',
        'express',
        'fs'
        
    ],
    module: {
        rules: [
            {
                test: /\.jsx|\.js/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
}