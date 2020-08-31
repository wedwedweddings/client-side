<template>
  <a-row>
    <!-- Logo -->
    <a-col :span="8">
      <router-link :to="{ name: 'home' }">
        <img
          id="header__logo"
          src="https://res.cloudinary.com/wedwedweddings/image/upload/v1598891031/wedwedweddings.com/logo/logo-white_jblnr0.png"
          :alt="logoAlt"
        />
      </router-link>
    </a-col>

    <!-- Menu -->
    <a-col :span="16">
      <!-- Private -->
      <a-menu class="header__menu header__menu-private" mode="horizontal" v-if="showPrivate">
        <a-sub-menu>
          <span slot="title" class="header__menu-private-wrapper">
            <a-icon type="user" />
            {{ mainNavBarMenuProfile }}
          </span>

          <a-menu-item key="guests" class="header__menu-private-wrapper-submenu-item">
            <router-link :to="{ name: 'tables-planner' }">{{ mainNavBarMenuTablesPlanner }}</router-link>
          </a-menu-item>

          <a-menu-item key="logout" @click="onLogOut">{{ mainNavBarMenuLogOut }}</a-menu-item>
        </a-sub-menu>
      </a-menu>

      <!-- Public -->
      <a-menu class="header__menu" mode="horizontal">
        <a-menu-item key="faq">
          <router-link :to="{ name: 'faq' }">
            <a-icon type="question" />
            {{ mainNavBarMenuFaq }}
          </router-link>
        </a-menu-item>

        <a-menu-item
          key="login"
          class="header__menu-item__primary"
          v-if="!showPrivate && showLoginButon"
        >
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

<style scoped>
span:not(:hover),
a:not(:hover) {
  color: rgba(255, 255, 255, 0.65) !important;
}

.header__menu-private-wrapper-submenu-item a:not(:hover) {
  color: rgba(0, 0, 0, 0.65) !important;
}

#header__logo {
  height: 64px;
  opacity: 0.95;
  padding: 12px 0px;
}

#header__logo-text {
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 16px;
  font-weight: bold;
  margin-left: 8px;
  vertical-align: middle;
}

.header__menu {
  background: none;
  border: none;
  float: right;
}

.header__menu-item__primary {
  background: #4185a4;
  border: none !important;
  border-radius: 4px;
  line-height: 32px;
  margin: 0px 0px 8px 16px;
}

.header__menu-item__primary a:hover {
  color: rgba(255, 255, 255, 0.85) !important;
}

.header__menu-item__primary:hover {
  background: #db8979 !important;
}
</style>
