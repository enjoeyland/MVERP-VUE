<template>
    <a-modal
            width="473px"
            centered
            title="직원등록"
            :visible="visibleModal"
            :confirmLoading="confirmModalLoading"
            @ok="submit"
            @cancel="handleCancel" >
		<a-form>
			<a-form-item v-bind="formItemLayout" label="ID">
				<a-input v-model="newEmpRecord.id"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="성명">
				<a-input v-model="newEmpRecord.name"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="주민등록번호">
				<a-input v-model="newEmpRecord.residRegistrNum"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="핸드폰번호">
				<a-input v-model="newEmpRecord.mobileNum"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="집주소">
				<a-input v-model="newEmpRecord.homeAddress"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="이메일주소">
				<a-input         v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ],
          },
        ]" v-model="newEmpRecord.emailAddress"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="자격증유무">
      <Select @change="changeCertification" :value="selectedCertification" :options="certification"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="특이사항">
				<a-input v-model="newEmpRecord.specialNote"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="입사일">
				<a-date-picker style="width:200px;margin-left:10px;" @change="hiredateOnchange"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="부서">
				<Select @change="changeDepartment" :value="selectedDepartment" :options="departments"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="직급">
				<Select @change="changePosition"  :value="selectedPosition" :options="positions"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="등급">
				<Select @change="changeLevel" :value="selectedLevel" :options="levels"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="재직상태">
				<Select @change="changeOfficeStatus" :value="selectedOfficeStatus" :options="officeStatus"/>
			</a-form-item>
			<a-form-item v-bind="formItemLayout" label="퇴사일">
				<a-date-picker style="width:200px;margin-left:10px;" @change="resignationDateOnchange"/>
			</a-form-item>
		</a-form>
    </a-modal>
</template>

<script>
    import Select from '../common/Select';
    export default {
        name: "AdminManagement_AddModal",
        components: { Select },
        props: {
            visibleModal: Boolean,
            confirmModalLoading: Boolean,
            handleOk: Function,
            handleCancel: Function,
        },

        data() {
            return {
                newEmpRecord: Object.create(null),
                selectedLevel:null,
                selectedDepartment:null,
                selectedPosition:null,
                selectedOfficeStatus:null,
                selectedHiredata:null,
                selectedResignationDate:null,
                selectedCertification:null,
                departments: Array,
                levels: Array,
                officeStatus: Array,
                positions: Array,
                certification:[{'key':'1','value':'유'},{'key':'2','value':'무'}],
                validateErrors: [],
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

        created: function() {
            this.$http.get('/erp/combobox/queryDepartmentsList').then(resp => {
            this.departments = resp || [];
                if (resp.errMsg !== null) {
                    this.$alert.error(resp.errMsg);
                } else {
                   this.departments = resp|| [];
                }
            });
            this.$http.get('/erp/combobox/queryPositionsList').then(resp => {
            this.positions = resp || [];
                if (resp.errMsg !== null) {
                    this.$alert.error(resp.errMsg);
                } else {
                    this.positions = resp || [];
                }
            });
            this.$http.get('/erp/combobox/queryLevelsList').then(resp => {
            this.levels = resp || [];
                if (resp.errMsg !== null) {
                    this.$alert.error(resp.errMsg);
                } else {
                    this.levels = resp || [];
                }
            });
            this.$http.get('/erp/combobox/queryOfficeStatusList').then(resp => {
            this.officeStatus = resp || [];
                if (resp.errMsg !== null) {
                    this.$alert.error(resp.errMsg);
                } else {
                    this.officeStatus = resp || [];
                }
            });
        },

        methods: {
            submit() {
                if (this.checkErrorArr()) {
                    this.$http.post('/erp/employee/create',this.newEmpRecord,"{'Content-Type':'application/json'}").then(resp => {
                        if (resp.successMsg == "success") {
                            this.$alert.success(resp.successMsg);
                            this.visibleAddModal = false;
                        } else {
                            this.$alert.error(resp.errMsg);
                        }
                    });
                }else {
                  this.$alert.error(this.validateErrors);
                }

            },
            checkErrorArr() {
                this.checkForm();
                if (!this.validateErrors.length) {
                  return true;
                } else {

                  return false;
                }
            },
            checkForm() {
              this.validateErrors = [];

              if (!this.newEmpRecord.id) {
                this.validateErrors.push("아이디를 입력하세요.\n");
              }
              if (!this.newEmpRecord.name) {
                this.validateErrors.push("성명을 입력하세요.");
              }
              if (!this.newEmpRecord.residRegistrNum) {
                this.validateErrors.push("주민등록번호를 입력하세요.");
              }else if (!this.validResidRegistrNum(this.newEmpRecord.residRegistrNum)) {
                this.validateErrors.push("주민등록번호를 yymmdd-xxxxxxx 13짜리로 입력하세요.");
              }
              if (!this.newEmpRecord.mobileNum) {
                this.validateErrors.push("핸드폰번호는 필수 항목입니다.");
              } else if (!this.validMobileNum(this.newEmpRecord.mobileNum)) {
                this.validateErrors.push("핸드폰번호를 xxx-xxxx-xxxx로 입력하세요.");

              }
              if (!this.newEmpRecord.depart) {
                this.validateErrors.push("부서는 필수 옵션입니다.");
              }
              if (!this.newEmpRecord.level) {
                this.validateErrors.push("등급은 필수 옵션입니다.");
              }
              if (!this.newEmpRecord.position) {
                this.validateErrors.push("직급은 필수 옵션입니다.");
              }
              if (!this.newEmpRecord.officeStatus) {
                this.validateErrors.push("재직상태는 필수 옵션입니다.");
              }
              if (!this.newEmpRecord.hiredate) {
                this.validateErrors.push("입사일은 필수 옵션입니다.");
              }
              if (!this.newEmpRecord.certification) {
                this.validateErrors.push("자격증유무는 필수 옵션입니다.");
              }
            },
            validMobileNum(mobileNum) {
              var regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
               return regExp.test(mobileNum);
            },
            validResidRegistrNum(residRegistrNum) {
              var regExp = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-[1-4][0-9]{6}$/;
              return regExp.test(residRegistrNum);
            },
            changeCertification(certification) {
              this.selectedCertification = certification;
              this.newEmpRecord.certification = certification;
            },
            changeLevel(level) {
              this.selectedLevel = level;
              this.newEmpRecord.level = level;
            },
            changeDepartment(department) {
              this.selectedDepartment = department;
              this.newEmpRecord.depart = department;
            },
            changePosition(position) {
              this.selectedPosition = position;
              this.newEmpRecord.position = position;
            },
            changeOfficeStatus(officeStatus) {
              this.selectedOfficeStatus = officeStatus;
              this.newEmpRecord.officeStatus = officeStatus;
            },
            hiredateOnchange(date, dateString) {
               this.newEmpRecord.hiredate = dateString;
            },
            resignationDateOnchange(date, dateString) {
              this.newEmpRecord.resignationDate = dateString;
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
.label{
        padding:10px 0px;
        width:510px;
        word-wrap: break-word;
        margin-right:20px;
        &::before {
          display: inline-block;
          margin-right: 4px;
          color: #f5222d;
          font-size: 14px;
          font-family: SimSun, sans-serif;
          line-height: 1;
          content: '*';
        }
      }
</style>
