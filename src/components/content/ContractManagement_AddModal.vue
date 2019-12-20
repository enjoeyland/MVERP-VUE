<template>
    <a-modal
            width="700px"
            title="Add a new record."
            :visible="visibleModal"
            :confirmLoading="confirmModalLoading"
            @ok="handleOk(newRecord)"
            @cancel="handleCancel" >
        <div>
            <a-row>
                <a-col :span="12">
                    <Select label="제작년도" @change="changeYear" :options="years" />
                </a-col>
                <a-col :span="12">
                    <Select label="시즌" @change="changeSeason" :options="seasons" />
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="12">
                    <label>거래처명
                        <a-input v-model="newRecord.consumer" />
                    </label>
                </a-col :span="12">
					<label><Select label="거래처코드" @change="changeSeason" :options="seasons" /></label>
                </a-col>
            </a-row>
        </div>
    </a-modal>
</template>

<script>
    import Select from '../common/Select';
    export default {
        name: "ContractManagement_AddModal",
        components: { Select },
        props: {
            visibleModal: Boolean,
            confirmModalLoading: Boolean,
            handleOk: Function,
            handleCancel: Function,
        },

        data() {
            return {
                newRecord: Object.create(null),
                years: [],
                seasons: [],
            }
        },

        created: function() {
            this.$http.get('/api/combobox/year').then(resp => {
                if (resp.status !== true) {
                    this.$alert.error(resp.errMsg);
                } else {
                    this.years = resp.results || [];
                }
            });
            this.$http.get('/api/combobox/season').then(resp => {
                if (resp.status !== true) {
                    this.$alert.error(resp.errMsg);
                } else {
                    this.seasons = resp.results || [];
                }
            });
        },

        methods: {
            changeYear(value) {
                this.newRecord.year = value;
            },
            changeSeason(value) {
                this.newRecord.season = value;
            }
        }
    }
</script>

<style scoped>
    .ant-row > div {
        padding: 10px 0;
    }

    .ant-input {
        width: 200px;
        margin-left: 10px;
    }
</style>