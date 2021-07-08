<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {request} from "@/assets/js/request";

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  mounted() {
    // request({
    //   url:"/User/login",
    //   params:{
    //     username:"administrator",
    //     password:"123456",
    //   }
    // }).then(res=>{
    //   console.log(res)
    // })
    console.log(1)
    this.$store.dispatch("user/login",{
      username:"administrator",
      password:"123456",
    })
  }
}
</script>
