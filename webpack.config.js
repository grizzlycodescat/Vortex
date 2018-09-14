const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/canvas.js',
    output: {
        path: __dirname + '/dist/',
        filename: './js/canvas.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader?attrs[]=video:src'
            }, 
            {
                test: /\.mp4$/,
                loader: 'url-loader?limit=10000&mimetype=video/mp4'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: "file-loader?name=/public/icons/[name].[ext]"
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['dist'] },
            files: ['./dist/*']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        })
    ],
    watch: true,
    devtool: 'source-map'
}
