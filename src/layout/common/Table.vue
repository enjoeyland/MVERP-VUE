<template>
    <a-col :span="8" :offset="2">
        <div class="operation" v-if="!!onAdd || !!onDelete || !!onEdit">
            <a-button @click="toAdd" v-if="!!onAdd" class="operation-btn" >등록</a-button>
            <slot v-if="!!onAdd"
                  name="add-modal"
                  v-bind="{
                    visibleModal: visibleAddModal,
                    confirmModalLoading: confirmAddModalLoading,
                    handleCancel: handleCancelAdd.bind(this)}" />
            <a-button @click="toEdit" v-if="!!onEdit"  class="operation-btn">수정</a-button>
            <slot v-if="!!onEdit"
                          name="edit-modal"
                          v-bind="{
                            record: editingRecord,
                            visibleModal: visibleEditModal,
                            confirmModalLoading: confirmEditModalLoading,
                            handleOk: handleOkEdit.bind(this),
                            handleCancel: handleCancelEdit.bind(this) }" />

            <a-button   v-if="!!onDelete"  class="operation-btn">삭제</a-button>


        </div>
    </a-col>
</template>
<script>
    export default {
        name: 'Table',
        props: {
            dataSource: Array,
            onAdd: Function,
            onDelete: Function,
            onToEdit: Function,
            onEdit: Function
        },

        data () {
            return {

                visibleAddModal: false,
                confirmAddModalLoading: false,

                visibleEditModal: false,
                confirmEditModalLoading: false,
                editingRecord: Object.create(null)
            }
        },


        methods: {
            toAdd() {
                this.visibleAddModal = true;
            },

            handleCancelAdd() {
                this.visibleAddModal = false
            },

            handleOkAdd(record) {
                this.confirmAddModalLoading = true;
                this.onAdd(record, () => {
                    this.visibleAddModal = false;
                    this.confirmAddModalLoading = false;
                }, (errMsg) => {
                    this.$alert.error(errMsg);
                });
            },

            handleCancelEdit() {
                this.visibleEditModal = false
            },

            toEdit() {
                this.visibleEditModal = true;
            },

            handleOkEdit(record) {
                this.confirmEditModalLoading = true;
                this.onEdit(record, () => {
                    this.visibleEditModal = false;
                    this.confirmEditModalLoading = false;
                }, (errMsg) => {
                    this.$alert.error(errMsg);
                });
            },
        },
    }
</script>
<style lang="less" scoped>
    .operation {
        padding: 0px;
    }
    .operation *:not(:first-child) {
        margin-left: 20px;
    }
    .operation-btn:focus {
        background: #fff;
        border-color: #323438;
        color: #323438;
    }
    .operation-btn {
        background: @grey;
        background-color: @grey;
        color: #ffc000;
    }

</style>
