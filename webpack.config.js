const FS = require('fs-extra')
const PATH = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

var nodeModules = {}
FS
.readdirSync('node_modules')
.filter(function(x)
{
    return ['.bin'].indexOf(x) === -1
})
.forEach(function(mod)
{
    nodeModules[mod] = 'commonjs ' + mod
})

module.exports =
{
    entry: './src/codecs/processor-worker/index.ts',
    output:
    {
        path: PATH.resolve(__dirname, 'release'),
        filename: 'optimizer.js',
    },
    target: 'node',
    externals: nodeModules,
    module: {
        rules: [
            {
                test: /\.(ts|tsx)(\?\S*)?$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
        ]
    },
    mode: process.env.NODE_ENV,
    plugins:
    [
        new UglifyJSPlugin(),
    ],
    resolve:
    {
        modules: [PATH.resolve('./node_modules'), process.env.NODE_PATH]
    },
}
