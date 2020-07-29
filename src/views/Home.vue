<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <!-- <table/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
//import table from '../components/table'
export default {
  name: 'home',
  components: {
    HelloWorld,
    //table
  }
}
</script>
