<template>
  <v-container>
    <app-alert
      v-if="getError"
      @dismissed="onDismissed"
      :text="getError.message"
    />
    <h1>Register</h1>
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

        <v-text-field
          type="password"
          name="confirmPassword"
          label="Confirm password"
          id="confirmPassword"
          v-model="confirmPassword"
          :rules="[comparePasswords]"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="onRegister" :loading="getLoading" :disabled="getLoading">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Register",
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
  }),
  computed: {
    ...mapGetters(["getUser", "getError", "getLoading"]),
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Password do not match"
        : "";
    },
  },
  methods: {
    ...mapActions(["registerUser", "clearError"]),
    onRegister() {
      this.registerUser({ email: this.email, password: this.password });
    },
    onDismissed() {
      this.clearError();
    },
  },
};
</script>
