module.exports = {
    entry: "./components/Main.js",
    output: {
        filename: "public/bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['react']
                }
            }
        ]
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    }
}
