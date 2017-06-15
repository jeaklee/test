var path = require('path');
var glob = require('glob');
var webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
var autoCleanPlugin = require('webpack-auto-clean-build-plugin');

var config = {};

switch (process.env.NODE_ENV)
{
    default:
    case 'production':
        config = {
            target: "node",
            node: {
                __filename: false,
                __dirname: false
            },
            entry: [
                "./src/server/server.iced"
            ],
            output: {
                path: path.join(__dirname, "..", "dist", "server"),
                publicPath: "/res/",
                filename: "server.js"
            },
            externals: [
                nodeExternals()
            ],
            module: {
                rules: [
                    {
                        test: /\.iced$/, 
                        exclude: [path.join(__dirname, "..", "src", "js")], 
                        use: "iced-coffee-loader"
                    },
                    { test: /\.pug$/, use: "pug-loader" },
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[hash:8].css",
                                    publicPath: "/res/css/",
                                    outputPath: "../css/"
                                }
                            },
                            "extract-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: false,
                                    minimize: true
                                }
                            },
                            {
                                loader: "resolve-url-loader"
                            }
                        ]
                    },
                    {
                        test: /\.sass$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[hash:8].css",
                                    publicPath: "/res/css/",
                                    outputPath: "../css/"
                                }
                            },
                            "extract-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: false,
                                    minimize: true
                                }
                            },
                            {
                                loader: "resolve-url-loader"
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    },
                    {
                        test: /\.js$/,
                        include: [path.join(__dirname, "..", "src", "js")],
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[hash:8].js",
                                    publicPath: "/res/js/",
                                    outputPath: "../js/"
                                }
                            }
                        ]
                    },
                    {
                        test: /\.iced$/,
                        include: [path.join(__dirname, "..", "src", "js")],
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[hash:8].js",
                                    publicPath: "/res/js/",
                                    outputPath: "../js/"
                                }
                            },
                            "iced-coffee-loader"
                        ]
                    },
                    {
                        test: /\.svg$/,
                        exclude: [path.join(__dirname, "..", "src", "fonts")],
                        use: [
                            {
                                loader: "svg-url-loader",
                                options: {
                                    noquotes: true,
                                    limit: 2 * 1024,
                                    name: "[name].[hash:8].svg",
                                    publicPath: "/res/img/",
                                    outputPath: "../img/"
                                }
                            },
                            {
                                loader: "image-webpack-loader",
                                options: {
                                    bypassOnDebug: true
                                }
                            }
                        ]
                    },
                    {
                        test: /(\.png|\.jpg|\.jpeg|\.gif)$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[hash:8].[ext]",
                                    publicPath: "/res/img/",
                                    outputPath: "../img/"
                                }
                            },
                            {
                                loader: "image-webpack-loader",
                                options: {
                                    bypassOnDebug: true
                                }
                            }                        ]
                    },
                    {
                        test: /(\.eot|\.woff|\.woff2|\.ttf|\.svg)$/,
                        include: [path.join(__dirname, "..", "src", "fonts")],
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[hash:8].[ext]",
                                    publicPath: "/res/fonts/",
                                    outputPath: "../fonts/"
                                }
                            }
                        ]
                    }
                ]
            },
            resolve: {
                extensions: ['.js', '.iced']
            },
            plugins: [
                new webpack.DefinePlugin({
                    'TRACE_LOG': JSON.stringify(false),
                    'DEBUG_LOG': JSON.stringify(false),
                    'INFO_LOG': JSON.stringify(true),
                    'WARN_LOG': JSON.stringify(true),
                    'ERROR_LOG': JSON.stringify(true),
                    'ENVIRONMENT': JSON.stringify('production')
                }),
                new webpack.optimize.UglifyJsPlugin(),
                new webpack.NoEmitOnErrorsPlugin()
            ]
        };
        break;
    
    case 'development':
        config = {
            target: "node",
            node: {
                __filename: false,
                __dirname: false
            },
            devtool: "source-map",
            entry: [
                "./src/server/server.iced"
            ],
            output: {
                path: path.join(__dirname, "..", "dist", "server"),
                publicPath: "/res/",
                filename: "server.js"
            },
            module: {
                rules: [
                    {
                        test: /\.iced$/, 
                        exclude: [path.join(__dirname, "..", "src", "js")], 
                        use: "iced-coffee-loader"
                    },
                    { test: /\.pug$/, use: "pug-loader?pretty" },
                    {
                        test: /\.css$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].css",
                                    publicPath: "/res/css/",
                                    outputPath: "../css/"
                                }
                            },
                            "extract-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: "resolve-url-loader"
                            }
                        ]
                    },
                    {
                        test: /\.sass$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].css",
                                    publicPath: "/res/css/",
                                    outputPath: "../css/"
                                }
                            },
                            "extract-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: "resolve-url-loader"
                            },
                            {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    },
                    {
                        test: /\.js$/,
                        include: [path.join(__dirname, "..", "src", "js")],
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].js",
                                    publicPath: "/res/js/",
                                    outputPath: "../js/"
                                }
                            }
                        ]
                    },
                    {
                        test: /\.iced$/,
                        include: [path.join(__dirname, "..", "src", "js")],
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].js",
                                    publicPath: "/res/js/",
                                    outputPath: "../js/"
                                }
                            },
                            "iced-coffee-loader"
                        ]
                    },
                    {
                        test: /\.svg$/,
                        exclude: [path.join(__dirname, "..", "src", "fonts")],
                        use: [
                            {
                                loader: "svg-url-loader",
                                options: {
                                    noquotes: true,
                                    limit: 2 * 1024,
                                    name: "[name].svg",
                                    publicPath: "/res/img/",
                                    outputPath: "../img/"
                                }
                            },
                            {
                                loader: "image-webpack-loader",
                                options: {
                                    bypassOnDebug: true
                                }
                            }                        ]
                    },
                    {
                        test: /(\.png|\.jpg|\.jpeg|\.gif)$/,
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[ext]",
                                    publicPath: "/res/img/",
                                    outputPath: "../img/"
                                }
                            },
                            {
                                loader: "image-webpack-loader",
                                options: {
                                    bypassOnDebug: true
                                }
                            }
                        ]
                    },
                    {
                        test: /(\.eot|\.woff|\.woff2|\.ttf|\.svg)$/,
                        include: [path.join(__dirname, "..", "src", "fonts")],
                        use: [
                            {
                                loader: "file-loader",
                                options: {
                                    name: "[name].[ext]",
                                    publicPath: "/res/fonts/",
                                    outputPath: "../fonts/"
                                }
                            }
                        ]
                    }
                ]
            },
            externals: [
                nodeExternals()
            ],
            resolve: {
                extensions: ['.js', '.iced']
            },
            plugins: [
                new autoCleanPlugin(),
                new webpack.BannerPlugin({
                    banner: "require('source-map-support').install();",
                    raw: true,
                    entryOnly: false
                }),
                new webpack.DefinePlugin({
                    'TRACE_LOG': JSON.stringify(true),
                    'DEBUG_LOG': JSON.stringify(true),
                    'INFO_LOG': JSON.stringify(true),
                    'WARN_LOG': JSON.stringify(true),
                    'ERROR_LOG': JSON.stringify(true),
                    'ENVIRONMENT': JSON.stringify('development')
                }),
                new webpack.NoEmitOnErrorsPlugin()
            ]
        };
        break;

    case 'test':
        config = {
            entry: glob.sync("./test/**/*.iced"),
            output: {
                path: path.join(__dirname, "..", "dist", "test"),
                filename: "test.[hash:8].js"
            },
            module: {
                rules: [
                    {
                        test: /\.iced$/,
                        exclude: [path.join(__dirname, "..", "src", "js")],
                        use: "iced-coffee-loader"
                    },
                    { test: /\.pug$/, use: "pug-loader?pretty" },
                    {
                        test: /(\.css|\.sass)$/,
                        use: "null-loader"
                    },
                    {
                        test: /(\.js|\.iced)$/,
                        include: [path.join(__dirname, "..", "src", "js")],
                        use: "null-loader"
                    },
                    {
                        test: /\.svg$/,
                        use: "null-loader"
                    },
                    {
                        test: /(\.png|\.jpg|\.jpeg|\.gif)$/,
                        use: "null-loader"
                    },
                    {
                        test: /(\.eot|\.woff|\.woff2|\.ttf)$/,
                        use: "null-loader"
                    }
                ]
            },
            externals: [
                nodeExternals()
            ],
            resolve: {
                extensions: ['.js', '.iced']
            },
            plugins: [
                new autoCleanPlugin(),
                new webpack.DefinePlugin({
                    'TRACE_LOG': JSON.stringify(false),
                    'DEBUG_LOG': JSON.stringify(false),
                    'INFO_LOG': JSON.stringify(false),
                    'WARN_LOG': JSON.stringify(false),
                    'ERROR_LOG': JSON.stringify(false),
                    'ENVIRONMENT': JSON.stringify('test')
                }),
                new webpack.NoEmitOnErrorsPlugin()
            ]
        };
        break;
}

module.exports = config
