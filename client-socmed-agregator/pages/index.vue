<template>
  <section class="container">
    <div>
      <h1 class="title">
        Github API
      </h1>
      <h2 class="subtitle">
        project
      </h2>
      <div class="search">
        <input type="text" v-model="owner">
        <button type="submit" @click="storeUserName" class="button">Get</button>
      </div>
    </div>
  </section>
</template>

<script>

// import { mapActions } from 'vuex'

export default {
  layout: 'default',
  data () {
    return {
      owner : '',
    }
  },
  methods : {
    storeUserName () {
      this.$store.commit('getOwner', this.owner)
      this.$router.replace({ 'path' : '/list' })
    }
  },

}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.search {
  padding-top: 15px;
}

button{
  padding: 10px;
  width :20%;
}

#owner {
  margin: 10px;
  padding: 10px
}
</style>

