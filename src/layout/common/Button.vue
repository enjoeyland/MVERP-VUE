<template>
        <div class="operation" v-if="!!onAdd || !!onDelete || !!onEdit">
            <a-button @click="toAdd" v-if="!!onAdd" class="operation-btn" >신규</a-button>
            <slot v-if="!!onAdd"
                  name="add-modal"
                  v-bind="{
                    visibleModal: visibleAddModal,
                    confirmModalLoading: confirmAddModalLoading,
                    handleOk: handleOkAdd.bind(this),
                    handleCancel: handleCancelAdd.bind(this) }" />

            <a-button @click="showDeleteConfirm"  v-if="!!onDelete" :disabled="selectedRows.length === 0" class="operation-btn">삭제</a-button>

            <a-button @click="toEdit" v-if="!!onEdit" :disabled="selectedRows.length === 0 || selectedRows.length > 1 " class="operation-btn">수정</a-button>
            <slot v-if="!!onEdit"
                  name="edit-modal"
                  v-bind="{
                    record: editingRecord,
                    visibleModal: visibleEditModal,
                    confirmModalLoading: confirmEditModalLoading,
                    handleOk: handleOkEdit.bind(this),
                    handleCancel: handleCancelEdit.bind(this) }" />

        </div>
</template>
<script>
    export default {
        name: 'Button',
        props: {
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
            showDeleteConfirm() {
                let length = this.selectedRows.length;
                let  vm = this;
                this.$confirm({
                    title: 'Are you sure delete '+ length +' item ?',
                    okText: 'Yes',
                    okType: 'danger',
                    cancelText: 'No',
                    onOk() {
                        vm.onDelete(vm.selectedRows, () => {
                            vm.selectedRows = [];
                        }, (err) => {
                            vm.$alert.error(err);
                        });
                    }
                });
            },

            onSelectChange(selectedRowKeys, selectedRows) {
                this.selectedRows = selectedRows;
            },

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
                if (this.selectedRows.length !==1) return;
                this.visibleEditModal = true;
                this.editingRecord = this.selectedRows[0];
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
        padding: 20px 0;
    }
    .operation *:not(:first-child) {
        margin-left: 20px;
    }
    .operation button:not(disabled):hover {
        background: @light-tealish;
        color: #fff;
    }
</style>
