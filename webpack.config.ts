import path from 'path';
import { Configuration, DefinePlugin } from 'webpack';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as webpackDevServer from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsConfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const webpackConfig = (): Configuration => ({
    entry: path.resolve(__dirname, './src/index.tsx'),
    ...(process.env.production || !process.env.development)
        ? {}
        : { devtool: "eval-source-map" },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsConfigPathsPlugin({ configFile: "./tsconfig.json" })]
    },
    output: {
        path: path.resolve(__dirname, "/build"),
        filename: "build.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
                exclude: /(node_modules | build)/
            },
            {
                test: /\.s?css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    devServer: {
        port: 4000,
        open: true,
        historyApiFallback: true,
    },
    plugins: [
        // HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // DefinePlugin allows you to create global constants which can be configured at compile time
        new DefinePlugin({
            "process.env": process.env.production || !process.env.development,
        }),
        // Speeds up TypeScript type checking and ESLint linting (by moving each to a separate process)
        new ForkTsCheckWebpackPlugin({
            eslint: {
                files: "./src/**/*.{ts,tsx,js,jsx}",
            }
        })
    ]

});

export default webpackConfig;