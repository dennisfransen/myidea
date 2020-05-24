import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";
import * as firebase from "firebase/app";
import "firebase/auth";
import Articles from "./articles";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    registerUser({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          commit("setLoading", false);
          const newUser = {
            id: data.user.uid,
            userArticles: [],
          };
          commit("setUser", newUser);
          router.push("/");
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    loginUser({ commit }, payload) {
      commit("setLoading", true);
      commit("clearError");
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((data) => {
          commit("setLoading", false);
          const user = {
            id: data.user.uid,
            userArticles: [],
          };
          commit("setUser", user);
          router.push("/");
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setError", error);
          console.log(error);
        });
    },
    autoLogin({ commit }, payload) {
      commit("setUser", { id: payload.uid, userArticles: [] });
    },
    logoutUser({ commit }) {
      firebase.auth().signOut();
      commit("setUser", null);
    },
    clearError({ commit }) {
      commit("clearError");
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
  },
  modules: {
    Articles,
  },
});
