import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DateFilter from "./filters/date";
import * as firebase from "firebase/app";
import "firebase/auth";
import AlertCmp from "@/components/shared/Alert.vue";

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertCmp);

var firebaseConfig = {
  apiKey: "AIzaSyBKYIwZ0ack9PU6WXrW8M_XjmfJW97_nSs",
  authDomain: "myidea-d4a4b.firebaseapp.com",
  databaseURL: "https://myidea-d4a4b.firebaseio.com",
  projectId: "myidea-d4a4b",
  storageBucket: "myidea-d4a4b.appspot.com",
  messagingSenderId: "1089828072186",
  appId: "1:1089828072186:web:955729a7a5e5ff35867743",
  measurementId: "G-RQLF3XRR26",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch("autoLogin", user);
      }
    });
    store.dispatch("Articles/loadArticles");
  },
}).$mount("#app");
