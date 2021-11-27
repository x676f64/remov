const {merge} = require("webpack-merge");
const common = require("./webpack.common");
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotEnv = require("dotenv-webpack");

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new DotEnv({
            path: `./.env.prod`,
            safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
            systemvars: false, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
            silent: false, // hide any errors
            defaults: false, // load '.env.defaults' as the default values if empty.
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
            }),
        ],
    },
});
