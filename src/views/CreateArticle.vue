<template>
  <v-container>
    <h1>Create Article</h1>
    <v-card class="mx-auto" width="600">
      <v-card-text>
        <v-text-field
          type="text"
          name="title"
          label="Title"
          id="title"
          v-model="title"
          required
        ></v-text-field>

        <v-text-field
          type="text"
          name="description"
          label="Description"
          id="description"
          v-model="description"
          required
        ></v-text-field>

        <v-file-input
          accept="image/*"
          label="File input"
          @change="onFilePicked"
        ></v-file-input>

        <v-img v-if="image" :src="imageUrl"></v-img>

        <v-textarea
          name="body"
          label="Body"
          id="body"
          value=""
          v-model="body"
          required
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="!formIsValid" @click="onCreateArticle"
          >Publish Article</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CreateArticle",
  data: () => ({
    title: "",
    description: "",
    imageUrl: "",
    body: "",
    image: null,
  }),
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.description !== "" &&
        this.imageUrl !== "" &&
        this.body !== ""
      );
    },
  },
  methods: {
    ...mapActions("Articles", ["createArticle"]),
    onCreateArticle() {
      if (!this.image) return;
      const articleData = {
        title: this.title,
        description: this.description,
        image: this.image,
        body: this.body,
        date: new Date(),
      };
      this.createArticle(articleData);
      this.$router.push("/articles");
    },
    onFilePicked(file) {
      if (file.name.lastIndexOf(".") <= 0) {
        return alert("Please add a valid file");
      }

      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });

      fileReader.readAsDataURL(file);
      this.image = file;
    },
  },
};
</script>
