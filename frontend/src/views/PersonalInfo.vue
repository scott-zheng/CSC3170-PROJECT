<template>
  <div>
    <a-layout>
      <a-layout-header class="layout-header">
        <Header class="header"/>
      </a-layout-header>
    </a-layout>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'PersonalInfo',
  data() {
    return {
      name: 'kkk',
    };
  },
  methods: {

  },
  components: {
    Header
  }
}
</script>

<style>
.header {
  background: #fff;
  padding: 0;
  position: 'fixed';
  width: '100%';
  text-align: "center";
}
.layout-header {
  background: #fff;
  width: '100%';
  box-shadow: 2px 5px 4px -0px rgb(184, 184, 184);
}

</style>