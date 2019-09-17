import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'
//import { addListener } from 'cluster'

Vue.use(Vuex)

//Allows axios to work locally or live
let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    activeBoard: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setLists(state, lists) {
      state.lists = lists
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({
      commit,
      dispatch
    }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({
          name: "boards"
        })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({
      commit,
      dispatch
    }, creds) {
      try {
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({
          name: "boards"
        })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({
      commit,
      dispatch
    }) {
      try {
        let success = await AuthService.Logout()
        if (!success) {}
        commit('resetState')
        router.push({
          name: "login"
        })
      } catch (e) {
        console.warn(e.message)
      }
    },
    //#endregion


    //#region -- BOARDS --
    getBoards({
      commit,
      dispatch
    }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },

    getLists({
      commit,
      dispatch
    }, boardId) {
      api.get(`boards/${boardId}/lists`)
        .then(res => {
          commit('setLists', res.data)
        })
    },

    addBoard({
      commit,
      dispatch
    }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    //#endregion


    //#region -- LISTS --
    async addList({
      commit,
      dispatch
    }, payload) {
      try {
        debugger
        let res = await api.post('/lists', payload)
        dispatch('getLists')
      } catch (error) {
        console.error(error)
      }
    }


    //#endregion
  }
})