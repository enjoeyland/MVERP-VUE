<template>
    <div v-if="pagination.pageNumbers.length > 1" class="pagination">
        <div>
            <a @click.prevent="$emit('page', 1)" class="page-num" :class="{ disabled: 1 === pagination.currentPage }">&laquo;</a>

            <a @click.prevent="$emit('page', i)" v-for="i in pagination.pageNumbers" class="page-num" :class="{ active: i === pagination.currentPage }">{{ i }}</a>

            <a href="javascript:void(0);" class="disabled">{{ pagination.currentPage + '/' + pagination.totalPage }}</a>
            <a @click.prevent="$emit('page', pagination.totalPage)" class="page-num" :class="{ disabled: pagination.totalPage === pagination.currentPage }">&raquo;</a>
        </div>
        <div>
            <a @click.prevent="$emit('page', pagination.currentPage - 1)" class="page-num prev-page" :class="{ disabled: 1 === pagination.currentPage }" >이전 페이지</a>
            <a @click.prevent="$emit('page', pagination.currentPage + 1)" class="page-num next-page" :class="{ disabled: pagination.totalPage === pagination.currentPage }">다음 페이지</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            total: Number,
            pageSize: Number,
            currentPage: Number
        },

        computed: {
            pagination: function () {
                return this.__page__(this.total, this.pageSize, this.currentPage)
            }
        },

        methods: {
            __page__(total, pageSize = 10, currentPage = 1) {
                let totalPage = Math.floor((total - 1) / pageSize) + 1;
                let showPage = 5;

                let offset_ = currentPage - Math.floor((showPage / 2) + 1);
                offset_ = offset_ > 0 ? offset_ : 0;

                let pageNumbers = Array
                    .from({ length: showPage })
                    .map((it, i) => i + 1 + offset_)
                    .filter(it => it <= totalPage);

                return {
                    currentPage,
                    totalPage,
                    pageNumbers
                };
            }
        }
    }
</script>

<style scoped lang="less">
    .pagination {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top: 30px;
    }

    .pagination a {
        position: relative;
        color: black;
        padding: 8px 16px;
        text-decoration: none;
        transition: background-color .3s;
        border: 1px solid #ddd;
        margin: 0 4px;
        cursor: pointer;

        &.active {
            background-color: @tealish;
            color: white;
            border: 1px solid @tealish;
        }

        &.disabled {
            pointer-events: none;
            cursor: default;
            color: @grey;
            border: 1px solid @grey;
        }

        &:hover:not(.active) {
            color: #fff;
            background-color: fade(@tealish, 60%);
        }
    }
</style>