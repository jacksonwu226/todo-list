const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/modules/index.js',
        task: './src/modules/task.js',
        project: './src/modules/project.js',
        todoList: './src/modules/todoList.js',
        UI: './src/modules/UI.js',
        upcoming: './src/modules/upcoming.js',
        storage: './src/modules/storage.js'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Todo List',
        }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        runtimeChunk: 'single',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],            
            },
        ],
    },
}