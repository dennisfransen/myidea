<template>
  <v-alert
    border="left"
    color="error"
    close-text="Close Alert"
    dark
    dismissible
    @input="onClose"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  name: "Alert",
  props: {
    text: String,
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>
