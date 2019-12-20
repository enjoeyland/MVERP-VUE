export default {
    list(ctx) {
        const { itemId } = ctx.queries;
        if (itemId) {
            return {
                status: true,
                'results|48':[{
                    'key|+1': 1,
                    'size': '@integer(60, 100)L',
                    'stock': '@integer(0, 1000)',
                    'item': 'itemId('+ itemId +')-@increment()',
                    'date': '@datetime("yyyy-MM-dd HH:mm:ss")'
                }]
            };
        } else {
            return {
                status: false,
                errMsg: 'Illegal params, itemId: ' + itemId
            };
        }
    }
};