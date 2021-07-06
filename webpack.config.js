// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
// const yargs = require('yargs');

// const isProductionBuild = yargs.argv.mode === 'production';

const config = {
    // devtool: isProductionBuild ? 'none' : 'source-map',
    plugins: [],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                exclude: ['/node_modules/'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: { crypto: false, path: false }
    }
};

// Bundle configuration: this includes both Oblivious and libsodium
const bundle = Object.assign({
    entry: './src/oblivious.ts',
    output: {
        filename: 'oblivious.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Oblivious',
        libraryTarget: 'var'
    }
}, config);

// Slim configuration: only include Oblivious, and require libsodium be passed to constructor
const slim = Object.assign({
    entry: './src/oblivious.slim.ts',
    output: {
        filename: 'oblivious.slim.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Oblivious',
        libraryTarget: 'var',
        libraryExport: 'ObliviousSlim' // Expose ObliviousSlim module so we don't have to call new Oblivious.ObliviousSlim()
    }
}, config);

module.exports = [
    bundle,
    slim
];