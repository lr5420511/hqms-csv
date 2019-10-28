'use strict';

const [join, VueLoaderWP, CleanWP, UglifyjsWP] = [
    require('path').join,
    require('vue-loader/lib/plugin'),
    require('clean-webpack-plugin'),
    require('uglifyjs-webpack-plugin')
];

const prod = /^production$/i.test(process.env.NODE_ENV);

const conf = module.exports = {
    entry: {
        'hqms-csv': ['./src/app.js']
    },
    output: {
        path: join(__dirname, 'build'),
        publicPath: 'build',
        filename: '[name].js'
    },
    devtool: prod ? false : 'inline-source-map',
    devServer: { historyApiFallback: { index: './index.html' } },
    module: {
        rules: [
            {
                test: /\.js$/i,
                loader: ['babel-loader']
            },
            {
                test: /\.vue$/i,
                loader: ['vue-loader']
            },
            {
                test: /\.css$/i,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/i,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|gif|ico|svg|jp(e?g|e))$/i,
                loader: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: prod ? '/resource' : '',
                            name: '[name]-[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(eot|ttf|woff2?)$/i,
                loader: ['url-loader']
            }
        ]
    },
    plugins: [new VueLoaderWP()]
};

if(prod) {
    delete conf.devServer;
    conf.plugins.push(new CleanWP(['./build']));
    conf.optimization = {
        minimizer: [
            new UglifyjsWP({
                sourceMap: false,
                test: /\.js$/i,
                include: ['/node_modules/']
            })
        ]
    };
}