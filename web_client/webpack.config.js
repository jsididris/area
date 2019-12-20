const fs = require('fs');
const path = require('path');
const hwp = require('html-webpack-plugin');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './ant-theme-vars.less'), 'utf8'));

module.exports = {
    entry: {
        index: ['babel-polyfill', path.join(__dirname, '/src/index.js')]
    },
    output: {
        filename: 'build.js',
        path: path.join(__dirname, '/dist')
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.less$/,
            use: [
                {loader: "style-loader"},
                {loader: "css-loader"},
                {
                    loader: "less-loader",
                    options: {
                        modifyVars: themeVariables,
                        javascriptEnabled: true
                    }
                }
            ]
        }]
    },
    plugins: [
        new hwp({template: path.join(__dirname, '/src/index.html')})
    ]
}