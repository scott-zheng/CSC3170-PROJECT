<template>
  <div style="text-align: center; position: 'fixed'; ">
    <p class="logo"><router-link to='/search'>Public Recommendation System for CUHKSZ</router-link></p>
    <p class="logo"><a-icon id="user" type="user" @click="toUser()" /></p>
    <a-button id='logout' @click="logout()">Log out</a-button>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      name: 'kkk',
    };
  },
  methods: {
    toUser() {
      var user_type = sessionStorage.getItem("user_type")
      var path = (user_type=='customer') ? '/personalinfo' : '/vendorinfo'
      this.$router.push({path: path}).catch(err => {err})
    },
    logout() {
      // clear login information here
      sessionStorage.clear()

      // jump to login page
      this.$router.push({path:'/login'}).catch(err => {err})
    }
  },
};
</script>

<style>
.logo {
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  float: left;
  padding-left: 20px;
}

#logout {
  padding-right: 20px;
}
</style>