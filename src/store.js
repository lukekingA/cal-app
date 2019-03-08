import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router.js'

let _apiCal = axios.create({
  baseURL: 'https://trackapi.nutritionix.com/v2/natural/nutrients',
  timeout: 3000,
  headers: {
    'x-app-key': "8120134b8a361912934e53e415fffd2c",
    "x-app-id": "814a7db9"
  }
})

let _apiDb = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/lukea'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchData: [],
    curLogFoods: [],
    curLog: {}
  },
  mutations: {
    searchData(state, data) {
      state.searchData = data
    },
    makeNewLog(state, data) {
      state.curLog = data
    },
    curLogFoods(state, data) {
      state.curLogFoods = data
    }
  },
  actions: {
    apiCalSearch({
      commit,
      dispatch
    }, query) {
      _apiCal.post('', query).then(res => {
        commit('searchData', res.data.foods)
        router.push({
          name: 'Results'
        })
      })
    },
    getOnelog({
      commit,
      dispatch
    }, id) {
      _apiDb.get('/logs/' + id).then(res => {
        commit('curLogFoods', res.data.foods)
      })
    },
    addToLog({
      commit,
      dispatch,
      state
    }, food) {
      if (!state.curLog.date) {
        dispatch('makeNewLog')
      }
      _apiDb.post('/logs/' + state.curLog._id, food).then(res => {
        dispatch('getOnelog', res.data._id)
      })
    },
    makeNewLog({
      commit
    }, date) {
      if (!date) {
        date = {
          date: new Date()
        }
      }
      _apiDb.post('/logs', date).then(res => {
        commit('makeNewLog', res.data.data)
      })
    }

  }
})