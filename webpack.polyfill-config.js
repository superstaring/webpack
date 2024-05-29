module.exports = {
    mode: "production",
    entry: "./src/index.js",

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    opitons: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: [
                                        "last 1 version",
                                        "> 1%"
                                    ],
                                    useBuiltIns: "usage",
                                    corejs: 3, // core的版本为3
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
}