// Webpack config
module.exports = {
    entry: "./app/app.js",
    output: {
        path: __dirname,
        filename: "./build/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
