import { getEmployeeInfo } from '@/api/employee'
import {
  setStore,
  getStore,
  removeStore
} from '@/utils/store'

const employee = {
  state: {
    id:'',
    name: '',
    residRegistrNum: '',
    emailAddress: '',
    certification: '',
    specialNote: '',
    hiredate: '',
    depart:'',
    position:'',
    level:'',
    resignationDate:'',
    officeStatus:'',
    homeAddress:'',
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_RESIDREGISTRNUM: (state, residRegistrNum) => {
      state.residRegistrNum = residRegistrNum
    },
    SET_MOBILENUM: (state, mobileNum) => {
      state.mobileNum = mobileNum
    },
    SET_EMAILADDRESS: (state, emailAddress) => {
      state.emailAddress = emailAddress
    },
    SET_CERTIFICATION: (state, certification) => {
      state.certification = certification
    },
    SET_SPECIALNOTE: (state, specialNote) => {
      state.specialNote = specialNote
    },
    SET_HIREDATE: (state, hiredate) => {
      state.hiredate = hiredate
    },
    SET_DEPART: (state, depart) => {
      state.depart = depart
    },
    SET_POSITION: (state, position) => {
      state.position = position
    },
    SET_LEVEL: (state, level) => {
      state.level = level
    },
    SET_RESIGNATIONDATE: (state, resignationDate) => {
      state.resignationDate = resignationDate
    },
    SET_FFFICESTATUS: (state, officeStatus) => {
      state.officeStatus = officeStatus
    },
    SET_HOMEADDRESS: (state, homeAddress) => {
      state.homeAddress = homeAddress
    },
  },

  actions: {
    QueryEmpInfo({ commit }, empname) {

      return new Promise((resolve, reject) => {
        getEmployeeInfo(empname).then(res => {
          const data = res[0]
          console.log(data.id)
          commit('SET_ID',data.id)
          commit('SET_NAME',data.name)
          commit('SET_RESIDREGISTRNUM',data.residRegistrNum)
          commit('SET_MOBILENUM',data.mobileNum)
          commit('SET_EMAILADDRESS',data.emailAddress)
          commit('SET_CERTIFICATION',data.certification)
          commit('SET_SPECIALNOTE',data.specialNote)
          commit('SET_HIREDATE',data.hiredate)
          commit('SET_DEPART',data.depart)
          commit('SET_POSITION',data.position)
          commit('SET_LEVEL',data.level)
          commit('SET_RESIGNATIONDATE',data.resignationDate)
          commit('SET_FFFICESTATUS',data.officeStatus)
          commit('SET_HOMEADDRESS',data.homeAddress)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })

    }
  }
}

export default employee
