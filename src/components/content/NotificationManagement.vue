<template>
    <div class="segment">
        <div class="panel">
            <template v-if="notifications && notifications.length !== 0" >
                <div class="row nt-item" :key="nt.key" v-for="nt in notifications">
                    <div @click="expand(nt.key)">
                        <span class="title">{{ nt.title }}</span>
                        <span class="date">{{ nt.date }}</span>
                    </div>
                    <transition name="slide-fade">
                        <p v-if="expands.indexOf(nt.key) !== -1">{{ nt.content }}</p>
                    </transition>
                </div>
                <div class="row">
                    <Pagination @page="page" :total="total" :page-size="pageSize" :current-page="currentPage" />
                </div>
            </template>
            <div v-else class="nt-item">
                No result.
            </div>
        </div>
    </div>
</template>
<script>
    import Pagination from '../common/Pagination';

    export default {
        name: "NotificationManagement",

        data: function () {
            return {
                notifications: [],
                total: 0,
                pageSize: 10,
                currentPage: 1,
                expands: [],
            }
        },

        created: function() {
            this.page(1);
        },

        methods: {
            page(pageNumber) {
                this.$http.get('/mverp_dev/api/notificationManagement/queryDataList', { currentPage: pageNumber,pageSize:10}).then(resp => {
                    if (resp.status !== true) {
                        this.$alert.error(resp.errMsg);
                    } else {
                        this.notifications = resp.results;
                        this.total = resp.total;
                        this.pageSize = resp.pageSize;
                        this.currentPage = pageNumber;
                    }
                })
            },

            expand(key) {
                let index = this.expands.indexOf(key);
                if (index === -1) this.expands.push(key);
                else this.expands.splice(index, 1);
            }
        }
    }
</script>

<style scoped lang="less">
    .segment .panel .row.nt-item {
        padding: 30px;
        font-size: 14px;
        font-family: SpoqaHanSansJP-Regular, sans-serif;
        border-bottom: 1px solid #e6eaee;
        color: #666;

        & > div {
            padding: 10px 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.5s ease-in;

            &:hover {
                background: #f2f3f5;
            }
        }

        & > p {
            margin-top: 10px;
        }

        &:last-child {
             border-bottom: none;
         }
    }

    .slide-fade-enter-active {
        transition: all .3s ease-out;
    }
    .slide-fade-leave-active {
        transition: all .8s ease-out;
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateX(120%);
        opacity: 0;
    }
</style>