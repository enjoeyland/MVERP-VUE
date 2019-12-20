<template>
    <div>
        <div class="operation">
            <!-- add -->
            <a-button v-if="!!onAdd" class="operation-btn" @click="onAdd">신규</a-button>

            <!-- delete -->
            <a-popconfirm
                    v-if="data.length"
                    title="Sure to delete?"
                    :visible="deletePopConfirmVisible"
                    @visibleChange="handleDeleteVisibleChange"
                    @confirm="handleDelete" @cancel="__hideDeletePopConfirm__" >
                <a-button :disabled="selectedRows.length === 0" v-if="!!onDelete" class="operation-btn">삭제</a-button>
            </a-popconfirm>

            <!-- edit -->
            <a-button v-if="editing && !!onEdit" :disabled="selectedRows.length === 0" class="operation-btn" @click="handleSave">저장</a-button>
            <a-button v-if="editing && !!onEdit" :disabled="selectedRows.length === 0" class="operation-btn" @click="handleCancel">취소</a-button>
            <a-button v-if="!editing && !!onEdit" :disabled="selectedRows.length === 0" class="operation-btn" @click="toEdit">수정</a-button>
        </div>

        <a-table bordered :rowSelection=rowSelection :dataSource="data" :columns="columns" :pagination="pagination">
            <template v-for="col in columnNames" :slot="col" slot-scope="text, record, index">
                <div :key="col">
                    <a-input v-if="canEdit(record.key)" style="margin: -5px 0"
                             :value="text"
                             @change="e => handleChange(e.target.value, record.key, col)"></a-input>
                    <template v-else>{{text}}</template>
                </div>
            </template>
        </a-table>
    </div>
</template>
<script>
    import EditableCell from './EditableCell'
    export default {
        name: 'EditableTable',
        components: {
            EditableCell,
        },
        props: {
            dataSource: Array,
            columns: Array,
            onAdd: Function,
            onDelete: Function,
            onEdit: Function
        },

        data () {
            return {
                editing: false,
                pagination: false,
                deletePopConfirmVisible: false,
                selectedRows: [],
                data: this.dataSource,
                cachedData: this.dataSource.map(item => ({...item})),
            }
        },

        watch: {
            selectedRows: function (rows, oldRows) {
                if (this.editing) {
                    // oldRows - rows  = cancelRows
                    let canceledRows = oldRows.concat(rows)
                        .filter(it =>
                            rows.findIndex(r => r.key === it.key) === -1 &&
                            oldRows.findIndex(r => r.key === it.key) !== -1);

                    if (canceledRows.length !==0) {
                        // TODO find edited record to confirm
                        const newData = [...this.data];
                        canceledRows.forEach(it => {
                            const target = newData.find(item => item.key === it.key);
                            if (target) {
                                Object.assign(target, this.cachedData.find(item => item.key === it.key));
                            }
                        });
                        this.data = newData;
                    }
                }

                if (this.editing && rows.length === 0) {
                    this.editing = false;
                }
            }
        },

        computed: {
            columnNames() {
                return this.columns
                    .filter(it => !!it.scopedSlots)
                    .map(it => it.scopedSlots.customRender);
            },

            rowSelection() {
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        this.selectedRows = selectedRows;
                    },
                }
            }
        },

        methods: {
            toEdit() {
                this.editing = true;
            },

            canEdit(key) {
              return this.editing && this.selectedRows.findIndex(it => it.key === key) !== -1;
            },

            handleDeleteVisibleChange (visible) {
                if (visible && this.selectedRows.length !== 0) {
                    this.__showDeletePopConfirm__();
                }
            },

            __hideDeletePopConfirm__() {
                this.deletePopConfirmVisible = false;
            },
            __showDeletePopConfirm__() {
                this.deletePopConfirmVisible = true;
            },

            handleDelete() {
                if (this.selectedRows.length === 0) return;
                this.onDelete(this.selectedRows, () => {
                    this.selectedRows = [];
                });
                this.__hideDeletePopConfirm__();
            },

            handleSave() {

            },

            handleCancel() {
                this.editing = false;
                this.data = this.cachedData.map(item => ({ ...item }));
            },

            handleChange (value, key, column) {
                const newData = [...this.data];
                const target = newData.find(item => key === item.key);

                // TODO store edited record
                if (target) {
                    target[column] = value;
                    this.data = newData
                }
            },
        },
    }
</script>
<style lang="less">
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
