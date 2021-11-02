const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
    name: 'client side, output to ./public',
    entry: './client/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new Dotenv()
    ],
};