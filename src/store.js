import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router.js'
import Food from './models/food.js'

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
    curLog: {},
    allLogs: [],
    inspectingLog: {}
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
    },
    setAllLogs(state, data) {
      state.allLogs = data
    },
    setInspectingLog(state, data) {
      state.inspectingLog = data
    }
  },
  actions: {
    apiCalSearch({
      commit,
      dispatch
    }, query) {
      _apiCal.post('', query).then(res => {
        let data = res.data.foods.map(f => new Food(f))
        commit('searchData', data)
        router.push({
          name: 'Results'
        })
      })
    },
    getAllLogs({
      commit,
      dispatch,
      state
    }) {
      _apiDb.get('/logs').then(res => {
        commit('setAllLogs', res.data.data)
      })
    },
    getOnelog({
      commit,
      dispatch
    }, id) {
      _apiDb.get('/logs/' + id).then(res => {
        commit('makeNewLog', res.data.data)
        commit('curLogFoods', res.data.data.foods)
      })
    },
    getPastLog({
      commit,
      dispatch
    }, id) {
      _apiDb.get('/logs/' + id).then(res => {
        commit('setInspectingLog', res.data.data)
        router.push({
          name: 'Details'
        })
      })
    },
    addToLog({
      commit,
      dispatch,
      state
    }, food) {
      _apiDb.post('/logs/' + state.curLog._id + '/foods', food).then(res => {
        dispatch('getOnelog', res.data.data._id)

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