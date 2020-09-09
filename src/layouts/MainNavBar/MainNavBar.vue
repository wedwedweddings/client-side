<template>
  <a-row>
    <!-- Logo -->
    <a-col class="header_logo-container" :span="8">
      <router-link :to="{ name: 'home' }">
        <img
          id="header_logo"
          src="https://res.cloudinary.com/wedwedweddings/image/upload/v1598891031/wedwedweddings.com/logo/logo-white_jblnr0.png"
          :alt="logoAlt"
        />
      </router-link>
    </a-col>

    <!-- Menu -->
    <a-col class="header_menu-container" :span="16">
      <a-menu class="header_menu" mode="horizontal">
        <!-- Public -->
        <a-menu-item key="faq">
          <router-link :to="{ name: 'faq' }">
            {{ mainNavBarMenuFaq }}
            <a-icon type="question-circle" />
          </router-link>
        </a-menu-item>

        <a-menu-item key="login" class="item--primary" v-if="!isLoggedIn && showLoginButon">
          <router-link :to="{ name: 'login' }">{{ mainNavBarMenuLogin }}</router-link>
        </a-menu-item>

        <!-- Private -->
        <a-menu-item key="tables-planner" v-if="isLoggedIn">
          <router-link :to="{ name: 'tables-planner' }">
            {{ mainNavBarMenuTablesPlanner }}
            <a-icon type="control" />
          </router-link>
        </a-menu-item>

        <a-menu-item key="logout" v-if="isLoggedIn" @click="onLogOut">
          {{ mainNavBarMenuLogOut }}
          <a-icon type="logout" />
        </a-menu-item>
      </a-menu>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "MainNavBar",
  data: () => ({
    isLoggedIn: false,
  }),
  methods: {
    getUserStatus() {
      this.isLoggedIn = localStorage.isLoggedIn
        ? JSON.parse(localStorage.isLoggedIn)
        : false;
    },
    onLogOut() {
      localStorage.clear();

      this.$router.push("/");
    },
  },
  computed: {
    showLoginButon() {
      return this.$route.path !== "/login" && !this.isLoggedIn;
    },
    // Lang
    logoAlt() {
      return this.$root.$options.languages.lang.home.meta.title[
        this.$root.$options.languages.current
      ];
    },
    mainNavBarMenuFaq() {
      return this.$root.$options.languages.lang.common.mainNavBar.menu.faq[
        this.$root.$options.languages.current
      ];
    },
    mainNavBarMenuLogin() {
      return this.$root.$options.languages.lang.common.mainNavBar.menu.login[
        this.$root.$options.languages.current
      ];
    },
    mainNavBarMenuProfile() {
      return this.$root.$options.languages.lang.common.mainNavBar.menu.profile[
        this.$root.$options.languages.current
      ];
    },
    mainNavBarMenuTablesPlanner() {
      return this.$root.$options.languages.lang.common.mainNavBar.menu
        .tablesPlanner[this.$root.$options.languages.current];
    },
    mainNavBarMenuLogOut() {
      return this.$root.$options.languages.lang.common.mainNavBar.menu.logOut[
        this.$root.$options.languages.current
      ];
    },
  },
  watch: {
    $route() {
      this.getUserStatus();
    },
  },
  beforeMount() {
    this.getUserStatus();
  },
};
</script>
