import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import employee from './employees'
import permission from './permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
      user,
      employee,
      permission
    },
    getters
})

export default store
