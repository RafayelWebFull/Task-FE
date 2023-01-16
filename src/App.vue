<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',

  data: () => ({
    user: {},
  }),
  methods: {
    getUser(){
      this.$store.dispatch('getUser')
    },
  },
  created(){
    if(this.$store.getters.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      this.getUser()
    } else {
      let route = this.$route.name;
      if(route !== 'Login') {
        this.$router.push({name: 'Login'})
      }
    }
  }
};
</script>
