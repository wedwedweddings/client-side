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
      <!-- Private -->
      <a-menu class="header_menu" mode="horizontal" v-if="showPrivate">
        <a-sub-menu>
          <span slot="title">
            <a-icon type="user" />
            {{ mainNavBarMenuProfile }}
          </span>

          <a-menu-item key="guests">
            <router-link :to="{ name: 'tables-planner' }">{{ mainNavBarMenuTablesPlanner }}</router-link>
          </a-menu-item>

          <a-menu-item key="logout" @click="onLogOut">{{ mainNavBarMenuLogOut }}</a-menu-item>
        </a-sub-menu>
      </a-menu>

      <!-- Public -->
      <a-menu class="header_menu" mode="horizontal">
        <a-menu-item key="faq">
          <router-link :to="{ name: 'faq' }">
            <a-icon type="question" />
            {{ mainNavBarMenuFaq }}
          </router-link>
        </a-menu-item>

        <a-menu-item key="login" class="item--primary" v-if="!showPrivate && showLoginButon">
          <router-link :to="{ name: 'login' }">{{ mainNavBarMenuLogin }}</router-link>
        </a-menu-item>
      </a-menu>
    </a-col>
  </a-row>
</template>

<script>
export default {
  name: "MainNavBar",
  props: ["isLoggedIn"],
  data: () => ({
    showPrivate: false,
  }),
  methods: {
    onLogOut() {
      localStorage.clear();
      this.showPrivate = false;
      this.$route.path === "/"
        ? this.$router.push("/home")
        : this.$router.push("/");
    },
  },
  computed: {
    showLoginButon() {
      return this.$route.path !== "/login";
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
    isLoggedIn(value) {
      this.showPrivate = value;
    },
  },
};
</script>
