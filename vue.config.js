var path = require('path');

module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'less',
            patterns: [
                path.resolve(__dirname, 'src/assets/less/common.less'),
                path.resolve(__dirname, 'src/assets/less/segment.less')
            ]
        }
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': 'rgb(39, 56, 100)',
                    'link-color': 'rgb(39, 56, 100)',
                    'border-radius-base': '2px',
                },
                javascriptEnabled: true
            }
        }
    }
};
