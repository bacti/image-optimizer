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
    entry: './src/Server.js',
    output:
    {
        path: PATH.resolve(__dirname, 'release'),
        filename: 'Server.js',
    },
    target: 'node',
    externals: nodeModules,
    plugins:
    [
        new UglifyJSPlugin(),
    ],
    resolve:
    {
        modules: [PATH.resolve('./node_modules'), process.env.NODE_PATH]
    },
}
