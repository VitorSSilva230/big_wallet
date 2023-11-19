<template>
 
    <Login msg="Welcome to Your Vue.js App"/>
  
</template>

<script>
//import HelloWorld from './components/views/HelloWorld.vue'
import Login from './components/auth/login/Login.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld,
    Login
  }
}
</script>


<style scoped lang="css">

@import url("./components/style/style.css");


</style>
