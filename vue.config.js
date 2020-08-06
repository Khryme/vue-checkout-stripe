module.exports = {
    devServer: {
        proxy: {
            '/arya.page.link': {
                target: 'http://localhost:3010',
                ws: true,
                changeOrigin: true,
                logLevel: 'debug'
            }

        }
        // proxy: 'http://localhost:3010'
    },
    chainWebpack: config => {
        config.module
            .rule("fonts")
            .test(/\.(ttf|otf|eot|woff|woff2)$/)
            .use("file-loader")
            .loader("file-loader")
            .tap(options => {
                options = {
                    // limit: 10000,
                    name: '/assets/fonts/[name].[ext]',
                }
                return options
            })
            .end()
    }
}

