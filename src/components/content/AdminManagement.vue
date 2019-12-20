<template>
    <div class="segment">
        <div class="panel">
            <div class="row">
				 <a-row>
					<a-col :span="12" :offset="2">
						<div>
							<label style="color:black;">성명</label>
							<a-input type="text" v-model="empname"/>
							<a-button class="operation-btn" @click="onSearch">검색</a-button>
							<ul>
								<li v-for="(item,index) in NewItems" :key="index" :value="item.key" v-text="item.value"></li>
							</ul>
						</div>
					</a-col>
					<Table
					   :on-add="handleAdd.bind(this)"
					   :on-delete="handleDelete.bind(this)"
					   :on-edit="handleEdit.bind(this)">
					
						<template v-slot:add-modal="props">
						  <AdminManagement_AddModal v-bind="props" />
						</template>

						<template v-slot:edit-modal="props">
							<AdminManagement_EditModal v-bind="props" />
						</template>

					</Table>
				</a-row>
            </div>
            <a-row type="flex" justify="center">
				<a-form  style="width:480px;margin:20px;padding:30px;border:2px solid #c5cbd4;border-radius:10px;">
					<a-form-item v-bind="formItemLayout" label="ID">
						<a-input v-model="empInfo.id"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="성명">
						<a-input v-model="empInfo.name"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="주민등록번호">
						<a-input v-model="empInfo.residRegistrNum"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="핸드폰번호">
						<a-input v-model="empInfo.mobileNum"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="집주소">
						<a-input v-model="empInfo.homeAddress"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="이메일주소">
						<a-input v-model="empInfo.emailAddress"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="자격증유무">
						<a-input v-model="empInfo.certification"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="특이사항">
						<a-input v-model="empInfo.sepcialNote"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="입사일">
						<a-input v-model="empInfo.hiredate"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="부서">
						<a-input v-model="empInfo.depart"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="직급">
						<a-input v-model="empInfo.position"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="등급">
						<a-input v-bind:value="empInfo.level"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="비밀번호">
						<a-input v-model="empInfo.password"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="재직상태">
						<a-input v-model="empInfo.officestatus"/>
					</a-form-item>
					<a-form-item v-bind="formItemLayout" label="퇴사일">
						<a-input v-bind:value="empInfo.resignationDate"/>
					</a-form-item>
				</a-form>
            </a-row>
        </div>
    </div>
</template>

<script>
    import AdminManagement_AddModal from './AdminManagement_AddModal';
    import AdminManagement_EditModal from './AdminManagement_EditModal';
    import Table from '../common/Table';
    import 'url-search-params-polyfill';

    export default {
        name: "AdminManagement",
        components: {
            Table,
            AdminManagement_AddModal,
            AdminManagement_EditModal
        },
        data() {
            return {
                empname:null,
				        empInfo: Object.create(null),
                items:[],
        				formItemLayout: {
        					labelCol: {
        					  xs: { span: 24 },
        					  sm: { span: 8 },
        					},
        					wrapperCol: {
        					  xs: { span: 26 },
        					  sm: { span: 16 },
        					},
        				},
            }
        },

        methods: {
            __loadData__() {
              this.empname = null;
            },

            onSearch() {
              console.log(this.empname);
              this.$store.dispatch('QueryEmpInfo', this.empname).then(()=>{
              this.empInfo = this.$store.state.employee
              console.log(this.$store.state.employee);
              })

            /*var params = new URLSearchParams();
              params.append('name',this.empname);//v-model
              //axios
              this.$http.post('/erp/employee/query',params).then(resp => {
              var tmp = Object.create(null);
                 if (resp.successMsg == "success") {
                   tmp=  resp.data[0] || [];
                   //["0":{}],{}
                 } else {
                    this.$alert.error(resp.errMsg);
                    this.empname=null;
                 }
                 this.empInfo = tmp;
              }).catch(err => {
                  this.$alert.error(err.message);
              });
              this.__loadData__();*/
            },
            handleAdd(record, onSuccess = () => {}, onError = () => {}) {
                this.$http.post('/api/contract/add', { body: record }).then(resp => {
                   if (resp.status !== true) {
                       onError(resp.errMsg)
                   } else {
                       this.__loadData__();
                       onSuccess();
                   }
                }).catch(err => {
                    onError(err.message);
                });
            },

            handleEdit(record, onSuccess = () => {}, onError = () => {}) {
                this.$http.post('/api/contract/edit', { body: record }).then(resp => {
                    if (resp.status !== true) {
                        onError(resp.errMsg)
                    } else {
                        this.__loadData__();
                        onSuccess();
                    }
                }).catch(err => {
                    onError(err.message);
                });
            },

            handleDelete(rows, onSuccess = () => {}, onError = () => {}) {
                this.$http.post('/api/contract/delete', { body: rows }).then(resp => {
                    if (resp.status !== true) {
                        onError(resp.errMsg)
                    } else {
                        this.__loadData__();
                        onSuccess();
                    }
                }).catch(err => {
                    onError(err.message);
                });
            },
        },


    }
</script>

<style scoped>
    .panel .row label:not(:first-child) {
        margin-left: 30px;
    }
	.ant-input {
		width: 200px;
		margin-left:10px;
	}
	.ant-btn {
		background-color:#a6a6a6;
		color:#ffc000;
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
      margin-left:20px;
  }
</style>
