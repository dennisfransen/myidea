import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export default {
  namespaced: true,
  state: {
    loadedArticles: [],
    loading: null,
    error: null,
  },
  mutations: {
    createArticle(state, payload) {
      state.loadedArticles.push(payload);
    },
    updateArticle(state, payload) {
      const article = state.loadedArticles.find((article) => {
        return article.id === payload.id;
      });

      if (payload.title) article.title = payload.title;
      if (payload.description) article.description = payload.description;
      if (payload.body) article.body = payload.body;
      if (payload.date) article.date = payload.date;
    },
    setLoadedArticles(state, payload) {
      state.loadedArticles = payload;
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
    async loadArticles({ commit }) {
      commit("setLoading", true);
      commit("clearError");
      await firebase
        .firestore()
        .collection("articles")
        .get()
        .then(function(querySnapshot) {
          let articles = [];

          querySnapshot.forEach((doc) => {
            articles.push({
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              imageUrl: doc.data().imageUrl,
              body: doc.data().body,
              date: doc.data().date,
              createdBy: doc.data().createdBy,
            });
          });
          commit("setLoading", false);
          commit("setLoadedArticles", articles);
        })
        .catch((error) => {
          commit("setError", error.message);
          commit("setLoading", false);
        });
    },
    async createArticle({ commit }, payload) {
      const article = {
        title: payload.title,
        description: payload.description,
        body: payload.body,
        date: payload.date.toISOString(),
        createdBy: firebase.auth().currentUser.uid,
      };
      let imageUrl;
      let id;
      await firebase
        .firestore()
        .collection("articles")
        .add(article)
        .then((docRef) => {
          id = docRef.id;
          return id;
        })
        .then((id) => {
          const fileName = payload.image.name;
          const extension = fileName.slice(fileName.lastIndexOf("."));
          return firebase
            .storage()
            .ref(`articles/${id}${extension}`)
            .put(payload.image);
        })
        .then((fileData) => {
          imageUrl = fileData.metadata.fullPath;
          return firebase
            .firestore()
            .collection("articles")
            .doc(id)
            .update({ imageUrl: imageUrl });
        })
        .then(() => {
          commit("createArticle", {
            ...article,
            imageUrl: imageUrl,
            id: id,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async updateArticleData({ commit }, payload) {
      commit("setLoading", true);
      const updateObj = {};

      if (payload.title) updateObj.title = payload.title;
      if (payload.description) updateObj.description = payload.description;
      if (payload.body) updateObj.body = payload.body;
      if (payload.date) updateObj.date = payload.date;

      await firebase
        .firestore()
        .collection("articles")
        .doc(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          commit("updateArticle", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
  },
  getters: {
    getArticles(state) {
      return state.loadedArticles.sort((articleA, articleB) => {
        return articleA.timestamp > articleB.timestamp;
      });
    },
    featuredArticles(state, getters) {
      return getters.getArticles.slice(0, 3);
    },
    getArticle(state) {
      return (articleId) => {
        return state.loadedArticles.find((article) => {
          return article.id === articleId;
        });
      };
    },
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
  },
};
