import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'
import AuthService from './AuthService'
import { defaultCoreCipherList } from 'constants'
//import { getMaxListeners } from 'cluster'
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
    tasks: {},
    activeBoard: {}
  },
  mutations: {
    resetState(state, user) {
      state.user = {}
    },

    setUser(state, user) {
      state.user = user
    },
    setBoards(state, data) {
      state.boards = data
    },
    setLists(state, data) {
      state.lists = data
    },
    setTasks(state, data) {
      Vue.set(state.tasks, data.listId, data.tasks)//state.tasks[data.listId] = data.tasks
    },
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
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
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
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          commit('setBoards', res.data)
        })
    },

    getLists({ commit, dispatch }, boardId) {
      api.get(`boards/${boardId}/lists`)
        .then(res => {
          commit('setLists', res.data)
        })
    },
    getTasks({ commit, dispatch }, listId) {
      api.get(`lists/${listId}/tasks`)
        .then(res => {
          commit('setTasks', { tasks: res.data, listId })
        })
    },

    async addBoard({ commit, dispatch }, boardData) {
      try {
        let res = await api.post('boards', boardData)
        dispatch('getBoards')
      } catch (error) {
        console.error(error)
      }
    },
    //#endregion


    //#region -- LISTS --
    async addList({ commit, dispatch }, payload) {
      try {
        let res = await api.post('/lists', payload)
        dispatch("getLists", payload.boardId)
      } catch (error) {
        console.error(error)
      }
    },

    async addTask({ commit, dispatch }, payload) {
      try {
        let res = await api.post('/tasks', payload)
        dispatch('getTasks', payload.listId) //commit to addTask in mutations, giving res.data
      } catch (error) {
        console.error(error)
      }
    },

    async deleteBoard({ commit, dispatch }, board) {
      try {
        let res = await api.delete('/boards/' + board)
        dispatch('getBoards')
        router.push("/boards")
      } catch (error) {
        console.error(error)
      }
    },

    async deleteList({ commit, dispatch }, list) {
      try {
        let res = await api.delete('/lists/' + list._id)
        dispatch('getLists', list.boardId)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTask({ commit, dispatch }, task) {
      try {
        let res = await api.delete('/tasks/' + task._id)
        dispatch('getTasks', task.listId)
      } catch (error) {
        console.error(error)
      }
    }
    //#endregion
  }
})