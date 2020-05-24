<template>
  <v-container>
    <h1>Article</h1>
    <v-progress-linear
      v-if="getLoading"
      indeterminate
      color="primary"
    ></v-progress-linear>
    <v-card class="mt-4" v-else>
      <v-card-title>
        {{ article.title }}
      </v-card-title>
      <v-card-text>
        {{ article.body }}
      </v-card-text>
      <v-card-actions v-if="userIsCreator">
        <edit-article-details-dialog :article="article" />
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import EditArticleDetailsDialog from "@/components/article/EditArticleDetailsDialog";

export default {
  name: "Article",
  props: {
    id: String,
  },
  computed: {
    ...mapGetters("Articles", ["getArticle", "getLoading"]),
    ...mapGetters(["getUser"]),
    userIsAuthenticated() {
      return this.getUser !== null && this.getUser !== undefined;
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) return false;
      return this.getUser.id === this.article.createdBy;
    },
    article() {
      return this.getArticle(this.id);
    },
  },
  components: {
    EditArticleDetailsDialog,
  },
};
</script>
