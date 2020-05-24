<template>
  <v-container>
    <app-alert
      v-if="getError"
      @dismissed="onDismissed"
      :text="getError.message"
    />
    <h1>Login</h1>
    <v-card class="mx-auto mt-4" width="600">
      <v-card-text>
        <v-text-field
          type="email"
          name="email"
          label="Email"
          id="email"
          v-model="email"
          required
        ></v-text-field>

        <v-text-field
          type="password"
          name="password"
          label="Password"
          id="password"
          v-model="password"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onLogin" :loading="getLoading" :disabled="getLoading"
          >Login</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
  }),
  computed: {
    ...mapGetters(["getUser", "getError", "getLoading"]),
  },
  methods: {
    ...mapActions(["loginUser", "clearError"]),
    onLogin() {
      this.loginUser({ email: this.email, password: this.password });
    },
    onDismissed() {
      this.clearError();
    },
  },
};
</script>
