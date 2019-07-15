import { saveObjArr, getObjArr, saveSession, getSession } from '@/utils/role'

const state = {
  pageId: getSession('pageId'),
  menu: getObjArr('menu'),
  count: getSession('count'),
  score: getSession('score'),
  changeTopic: getSession('changeTopic'),
  changeTab: getSession('tab'),
  paper: getSession('paper')
}

const mutations = {
  SET_PAGEID: (state, pageId) => {
    state.pageId = pageId
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  },
  SET_COUNT: (state, count) => {
    state.count = count
  },
  SET_SCORE: (state,score) => {
    state.score = score
  },
  SET_CHANGE: (state,changeTopic) => {
    state.changeTopic = changeTopic
  },
  SET_CHANGETAB: (state,changeTab) => {
    state.changeTab = changeTab
  },
  SET_PAPER: (state,paper) => {
    state.paper = paper
  }
}

const actions = {
  setId({commit}, id) {
    return new Promise(resolve => {
      commit('SET_PAGEID', id)
      saveSession('pageId', id)
      resolve()
    })
  },
  setTopic({commit}, id) {
    return new Promise(resolve => {
      commit('SET_CHANGE', id)
      saveSession('changeTopic', id)
      resolve()
    })
  },
  setPaper({commit}, id) {
    return new Promise(resolve => {
      commit('SET_PAPER', id)
      saveSession('paper', id)
      resolve()
    })
  },
  setTab({commit}, tab) {
    return new Promise(resolve => {
      commit('SET_CHANGETAB', tab)
      saveSession('tab', tab)
      resolve()
    })
  },
  setScore({commit}, score) {
    return new Promise(resolve => {
      commit('SET_SCORE', score)
      saveSession('score', score)
      resolve()
    })
  },
  changeMenu({commit}, data) {
    commit('SET_MENU', data)
    saveObjArr('menu', data)
  },
  setCount({commit},data) {
    commit('SET_COUNT', data)
    saveSession('count', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}