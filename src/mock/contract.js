export default {
    list(ctx) {
        const { currentPage, year, season } = ctx.queries;
        const pageSize = 20;
        if (currentPage) {
            return {
                status: true,
                ['results|'+ pageSize]:[{
                    'key|+1': 1,
                    'contractCustmer': '@ctitle(5, 10)',
                    'year': year,
                    'season': season,
                    'contractCode': contractCode,
                }],
                total: 112,
                pageSize: pageSize
            };
        } else {
            return {
                status: false,
                errMsg: 'Illegal params, currentPage: ' + currentPage
            };
        }
    },

    add(ctx) {
        let record = ctx.body.data;

        return { status: true };
    },

    edit(ctx) {
        let record = ctx.body.data;

        return { status: true };
    },

    delete(ctx) {
        let record = ctx.body.data;

        return { status: true };
    }
};