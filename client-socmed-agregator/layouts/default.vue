<template>
  <div>
    <div class="navigation">
      <Navbar/>
    </div>
    <div class="container">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'
export default {
  components:{
    Navbar
  }
}
</script>

<style>
* {
  margin:0; 
  padding:0;
}
.navigation{
  padding: 0;
  margin: 0;
}
</style>
