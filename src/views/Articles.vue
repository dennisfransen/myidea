<template>
  <v-container>
    <h1>Articles</h1>
    <v-progress-linear
      v-if="getLoading"
      indeterminate
      color="primary"
    ></v-progress-linear>
    <v-card
      v-else
      class="my-4"
      v-for="article in getArticles"
      :key="article.id"
    >
      <v-card-title>
        {{ article.title }}
      </v-card-title>
      <v-card-text>
        <p>{{ article.body }}</p>
        <p>{{ article.date | date }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="openArticle(article.id)">Read more</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Articles",
  computed: {
    ...mapGetters("Articles", ["getArticles", "getLoading"]),
  },
  methods: {
    openArticle(id) {
      this.$router.push(`/articles/${id}`);
    },
  },
};
</script>

<style></style>
