<template>
  <div id="app">
    <a-layout id="main-layout">
      <a-layout-header id="main-header">
        <MainNavBar />
      </a-layout-header>

      <a-layout-content id="main-content">
        <router-view />
      </a-layout-content>

      <a-layout-footer id="main-footer">
        <MainFooter />
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
// Layouts
import MainFooter from "./layouts/MainFooter/MainFooter";
import MainNavBar from "./layouts/MainNavBar/MainNavBar";

export default {
  name: "app",
  components: {
    MainFooter,
    MainNavBar,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
