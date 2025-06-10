const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    mode: 'development',
    devServer: {
        static: './dist',
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },      
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
};
