import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import { createProvider } from '../vue-apollo';
import getLocation from '../graphql/getLocation.graphql';


Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  plugins: [createPersistedState],
  state: {
    location: {},
    isLoading: false,
    error: null
  },
  mutations: {
    toggleLoading(state, payload) {
      state.isLoading = payload;
    },
    updateLocation(state, payload) {
      state.location = Object.assign(state.location, payload.location);
      state.location.id = payload.id;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    GET_LOCATION({ commit }, ip) {
      commit('toggleLoading', true);
      createProvider
        .query({
          query: getLocation,
          variables: {
            ip: ip
          },
        })
        .then(res => {
          commit('updateLocation', {location: res.data.getLocation, ip})
        })
        .catch(err => commit('setError', err))
        .finally(() => commit('toggleLoading', false));
    },
  }
});