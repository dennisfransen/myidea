<template>
  <v-app>
    <NavBar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/templates/NavBar'

export default {
  name: "App",
  data: () => ({}),
  components: {
    NavBar
  }
};
</script>
