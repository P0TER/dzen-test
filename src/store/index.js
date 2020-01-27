import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import apollo from '../vue-apollo';
import getLocation from '../graphql/getLocation.graphql';


Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState({
    paths: ['history', 'lang']
  })],
  state: {
    location: {},
    isLoading: false,
    error: null,
    history: [],
    lang: 'en'
  },
  mutations: {
    TOGGLE_LOADING(state, payload) {
      state.isLoading = payload;
    },
    UPDATE_LANG(state, lang) {
      state.lang = lang;
    },
    UPDATE_LOCATION(state, payload) {
      state.location = Object.assign({}, payload.location);
      state.location.ip = payload.ip;
    },
    UPDATE_ERROR(state, payload) {
      state.error = payload;
    },
    UPDATE_HISTORY(state, payload) {
      state.history.unshift(payload);
    },
    CLEAR_HISTORY(state) {
      state.history = []
    }
  },
  actions: {
    GET_LOCATION({ commit }, ip) {
      commit('TOGGLE_LOADING', true);
      apollo
        .query({
          query: getLocation,
          variables: {
            ip: ip
          },
        })
        .then(res => {
          // if (!res.data.getLocation) throw new Error('Invalid IPv4 address');
          commit('UPDATE_LOCATION', {location: res.data.getLocation, ip});
          commit('UPDATE_HISTORY', {location: res.data.getLocation, ip});
          commit('UPDATE_ERROR', null);
        })
        .catch(err => commit('UPDATE_ERROR', err))
        .finally(() => commit('TOGGLE_LOADING', false));
    },
  },
  getters: {
    getCountryName(state) {
      if (state.location.country) {
        return state.location.country.names[state.lang] ? state.location.country.names[state.lang] : state.location.country.names.en;
      } else {
        return '—';
      }
    },
    getContinentName(state) {
      if (state.location.continent) {
        return state.location.continent.names[state.lang] ? state.location.continent.names[state.lang] : state.location.continent.names.en;
      } else {
        return '—';
      }
    },
    getCityName(state) {
      if (state.location.city) {
        return state.location.city.names[state.lang] ? state.location.city.names[state.lang] : state.location.city.names.en;
      } else {
        return '—';
      }
    },
    getHistoryCountryName: state => id => {
      if (state.history[id].location.country) {
        return state.history[id].location.country.names[state.lang] ? state.history[id].location.country.names[state.lang] : state.history[id].location.country.en;
      } else {
        return '—';
      }
    },
    getHistoryCityName: state => id => {
      if (state.history[id].location.city) {
        return state.history[id].location.city.names[state.lang] ? state.history[id].location.city.names[state.lang] : state.history[id].location.city.en;
      } else {
        return '—';
      }
    }
  }
});