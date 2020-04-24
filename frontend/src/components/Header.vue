<template>
  <div style="text-align: center;">
    <p class="logo"><router-link to='/'>Public Recommendation System for CUHKSZ</router-link></p>
    <a-button>Log out</a-button>
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

  },
};
</script>

<style>
.logo {
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  float: left;
  padding-left: 20px;
};
</style>

vue