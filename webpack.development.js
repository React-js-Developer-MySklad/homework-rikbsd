const { merge } = require("webpack-merge");
const config = require('./webpack.config');

module.exports = merge(config, {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader', 'postcss-loader'],
                exclude: /\.module\.css$/i,
            },
            {
                test: /\.module\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    },
                    'postcss-loader'
                ],
            },
        ]
    }
});
