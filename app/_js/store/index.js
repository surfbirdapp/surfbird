import Vue from 'vue/dist/vue.js'
import Vuex from 'vuex'
import profiles from './modules/profiles'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    profiles
  },
  strict: debug
})
