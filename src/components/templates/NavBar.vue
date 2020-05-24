<template>
  <v-app-bar app dark>
    <v-toolbar-title>
      <router-link to="/" class="app-title">
        <span class="white--text">MY</span>
        <span class="primary--text">IDEA</span>
      </router-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <template v-for="{ link, title } in menuItems">
      <v-btn class="mx-1" :to="link" :key="title" v-text="title"></v-btn>
    </template>

    <v-btn class="mx-1" v-show="getUser" @click="onLogout">Logout</v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["getUser"]),
    menuItems() {
      let menuItems = [
        { title: "Articles", link: "/articles" },
        { title: "Login", link: "/login" },
        { title: "Register", link: "/register" },
      ];

      if (this.getUser) {
        menuItems = [
          { title: "Articles", link: "/articles" },
          { title: "Create Article", link: "/create-article" },
          { title: "Profile", link: "/profile" },
        ];
      }

      return menuItems;
    },
  },
  methods: {
    ...mapActions(["logoutUser"]),
    onLogout() {
      this.logoutUser();
    },
  },
};
</script>

<style scoped>
.app-title {
  text-decoration: none;
}
</style>
