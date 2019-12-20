<template>
    <a-modal
            width="700px"
            :title="'Edit record ' + record.key + '.'"
            :visible="visibleModal"
            :confirmLoading="confirmModalLoading"
            @ok="handleOk(editRecord)"
            @cancel="handleCancel" >
        <div>
            <a-row>
                <a-col :span="12">
                    <Select label="연도" :default-value="record.year" @change="changeYear" :options="years" />
                </a-col>
                <a-col :span="12">
                    <Select label="연도" :default-value="record.season" @change="changeSeason" :options="seasons" />
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="12">
                    <label>거래처명 <a-input v-model="editRecord.consumer" /> </label>
                </a-col>
                <a-col :span="12"><label><Select label="거래처코드" @change="changeSeason" :options="seasons" /></label>
                </a-col>
            </a-row>
        </div>
    </a-modal>
</template>

<script>
    import Select from '../common/Select';
    export default {
        name: "AdminManagement_EditModal",
        components: { Select },
        props: {
            record: Object,
            visibleModal: Boolean,
            confirmModalLoading: Boolean,
            handleOk: Function,
            handleCancel: Function,
        },

        data() {
            return {
                editRecord: this.record,
                years: [
                    { value: '2018', name: '2018'},
                    { value: '2019', name: '2019'},
                ],
                seasons: [
                    { value: '1', name: '第一季度'},
                    { value: '2', name: '第二季度'},
                ],
            }
        },

        methods: {
            changeYear(value) {
                this.editRecord.year = value;
            },
            changeSeason(value) {
                this.editRecord.season = value;
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