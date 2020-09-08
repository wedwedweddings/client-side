<template>
  <div id="app">
    <!-- Banner -->
    <a-alert class="home_alert" type="success" :message="banner" />

    <!-- App -->
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
  computed: {
    banner() {
      return this.$root.$options.languages.lang.common.banner[
        this.$root.$options.languages.current
      ];
    },
  },
  created() {
    // Check Facebook status
    /*FB.getLoginStatus(function (response) {
      if (!localStorage.isLoggedIn && response.status !== "connected") {
        this.$router.push("/login");
      }
    });*/
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
