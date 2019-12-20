const Mock = require('mockjs');
import { getQueries, getParams } from './Query'

export default ['get', 'post', 'delete', 'put', 'head', 'connect', 'options', 'trace', 'patch'].reduce((a, c) => {
    a[c] = function (url, fn) {
        mock(url, c, fn);
    };
    return a;
}, {});

function mock(regexUrl, type, fn) {
    Mock.mock(regexUrl, type, options => {
        console.log('[mock-'+ type +'] access ', options.url);
        if (typeof fn === 'function') {
            let ctx = getCtx(regexUrl, options);
            let obj = fn(ctx);
            return Mock.mock(obj)
        } else if (typeof fn === 'object') {
            return Mock.mock(fn)
        }
    })
}

function getCtx(regexUrl, options) {
    let accessUrl = options.url;
    let queries = getQueries(accessUrl);
    let params = getParams(regexUrl, accessUrl);
    let body = options.body;

    let ctx = Object.create(null);
    ctx.queries = queries;
    ctx.params = params;
    ctx.body = body;
    return ctx;
}