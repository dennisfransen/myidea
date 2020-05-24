<template>
  <v-container>
    <h1>Home</h1>
    <h2 v-for="featuredArticle in featuredArticles" :key="featuredArticle.id">
      {{ featuredArticle.title }}
    </h2>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters("Articles", ["featuredArticles"]),
  },
};
</script>
