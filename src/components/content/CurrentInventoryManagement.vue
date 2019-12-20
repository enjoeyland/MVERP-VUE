<template>
    <div class="segment">
        <div class="panel">
            <div class="row">
                <Select label="년도"
                        :options="years"
                        :value="selectedYear"
                        @change="changeYear" />
                <Select label="시즌"
                        :value="selectedSeason"
                        @change="changeSeason"
                        :options="seasons" />						
                <Select label="거래처명"
                        :value="selectedCustomer"
                        @change="changeCustomer"
                        :options="customers" />

            </div>
            <div class="row">
                <Select label="아이템명"
                        :style="{ 'font-weight': 'bold' }"
                        :userStyle="{ width: '100px', margin: '20px 10px' }"
                        :value="selectedItem"
                        @change="changeItem"
                        :options="items"/>
                <Table :dataSource="dataSource" :columns="columns" />
            </div>
        </div>
    </div>
</template>

<script>
    import Select from '../common/Select';
    import Table from '../common/Table';

    const columns = [{
        title: '사이즈',
        dataIndex: 'size',
        width: '20%',
        scopedSlots: { customRender: 'size' },
    }, {
        title: '재고',
        dataIndex: 'stock',
        width: '20%',
        scopedSlots: { customRender: 'stock' },
    }];

    export default {
        name: "CurrentInventoryManagement",
        components: {
            Select,
            Table,
        },

        data() {
            return {
                selectedYear: '',
                selectedCustomer: '',
                selectedSeason: '',
                selectedItem: '',
                years: [],
                customers: [],
                seasons: [],
                items: [],

                columns: columns,
                dataSource: [],
            }
        },

        created: function() {
            this.$http.get('/mverp_dev/api/dropdown/year').then(resp => {
                if (resp.status !== true) {
                    this.$alert.error(resp.errMsg);
                } else {
                    this.years = resp.results || [];
                    this.changeYear(this.years[0].value);
                }
            });
        },

        methods: {
            changeYear(year) {
                this.selectedYear = year;
                this.$http.get('/mverp_dev/api/dropdown/season', { year:this.selectedYear}).then(resp => {
                    if (resp.status !== true) {
                        this.$alert.error(resp.errMsg);
                    } else {
                        this.seasons = resp.results || [];
                        this.changeSeason(this.seasons[0].value);
                    }
                });
            },
			changeSeason(season) {
				this.selectedSeason = season;               
				console.log(this.selectedYear);				
                this.$http.get('/mverp_dev/api/dropdown/contract', {year:this.selectedYear, season:this.selectedSeason }).then(resp => {
                    if (resp.status !== true) {
                        this.$alert.error(resp.errMsg);
                    } else {
                        this.customers = resp.results || [];
                        this.changeCustomer(this.customers[0].value);
                    }
                });
            },

            changeCustomer(customer) {
                this.selectedCustomer = customer;
                this.$http.get('/mverp_dev/api/dropdown/items', { year: this.selectedYear, season:this.selectedSeason, contractName: customer}).then(resp => {
                    if (resp.status !== true) {
                        this.$alert.error(resp.errMsg);
                    } else {
                        this.items = resp.results || [];
                        this.changeItem(this.items[0].value);
                    }
                });
            },



            changeItem(item) {
                this.selectedItem = item;
                this.$http.get('/api/currentInventory/list', { itemId: item }).then(resp => {
                    if (resp.status !== true) {
                        this.$alert.error(resp.errMsg);
                    } else {
                        this.dataSource = resp.results || [];
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .panel .row label:not(:first-child) {
        margin-left: 30px;
    }
</style>