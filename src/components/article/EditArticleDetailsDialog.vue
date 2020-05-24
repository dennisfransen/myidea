<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <template v-slot:activator="{ on }">
      <v-btn icon color="red lighten-2" dark v-on="on" absolute top right>
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Edit Article
      </v-card-title>

      <v-card-text>
        <v-text-field
          type="text"
          name="title"
          label="Title"
          id="title"
          v-model="editedTitle"
          required
        ></v-text-field>

        <v-text-field
          type="text"
          name="description"
          label="Description"
          id="description"
          v-model="editedDescription"
          required
        ></v-text-field>

        <v-textarea
          name="body"
          label="Body"
          id="body"
          :value="editedBody"
          v-model="editedBody"
          required
        ></v-textarea>
      </v-card-text>

      <v-card-actions class="text-center">
        <v-row no-gutters>
          <v-col cols="4">
            <v-btn text @click="dialog = false">
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="8">
            <v-btn block color="primary" @click="onSaveChanges">
              Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "EditArticleDetailsDialog",
  created() {
    this.editedTitle = this?.article?.title;
    this.editedDescription = this?.article?.description;
    this.editedBody = this?.article?.body;
  },
  data: () => ({
    dialog: false,
    editedTitle: "",
    editedDescription: "",
    editedBody: "",
  }),
  props: ["article"],
  methods: {
    ...mapActions("Articles", ["updateArticleData"]),
    onSaveChanges() {
      if (
        this.editedTitle.trim() === "" ||
        this.editedDescription.trim() === "" ||
        this.editedBody.trim() === ""
      ) {
        return;
      }
      this.dialog = false;
      this.updateArticleData({
        id: this.article.id,
        title: this.editedTitle,
        description: this.editedDescription,
        body: this.editedBody,
      })
    },
  },
};
</script>

<style></style>
