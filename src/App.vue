<template>
  <div id="app">
    <a-layout id="app-main-layout" class="main-layout__bg">
      <a-layout-header id="main-header">
        <MainNavBar :isLoggedIn="mainNavBar.isLoggedIn" />
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

// Utils
import colors from "../utils/colors";

export default {
  name: "app",
  components: {
    MainFooter,
    MainNavBar
  },
  data: () => ({
    colors,
    layouts: {
      main: {
        class: "",
        node: null,
        style: null
      },
      header: {
        node: null,
        style: null
      },
      content: {
        node: null,
        style: null
      },
      footer: {
        node: null,
        style: null,
        p: {
          node: null,
          style: null
        }
      }
    },
    mainNavBar: {
      isLoggedIn: false
    }
  }),
  methods: {
    setMainLayoutsStyle() {
      if (
        this.$route.name === "home" ||
        this.$route.name === "index" ||
        this.$route.name === "faq" ||
        this.$route.name === "tables-planner"
      ) {
        this.layouts.footer.node.style = this.layouts.footer.style;
      } else {
        this.layouts.footer.node.style.position = "fixed";
        this.layouts.footer.node.style.bottom = "0";
        this.layouts.footer.node.style.left = "0";
      }

      if (localStorage.isLoggedIn) {
        this.mainNavBar.isLoggedIn = JSON.parse(localStorage.isLoggedIn);
      }
    }
  },
  mounted() {
    this.layouts.main.node = document.querySelector("#app-main-layout");
    this.layouts.header.node = document.querySelector("#main-header");
    this.layouts.content.node = document.querySelector("#main-content");
    this.layouts.footer.node = document.querySelector("#main-footer");
    this.layouts.footer.p.node = document.querySelector("#main-footer p");

    this.layouts.main.style = this.layouts.main.node.style;
    this.layouts.header.style = this.layouts.header.node.style;
    this.layouts.content.style = this.layouts.content.node.style;
    this.layouts.footer.style = this.layouts.footer.node.style;
    this.layouts.footer.p.style = this.layouts.footer.p.node.style;

    this.setMainLayoutsStyle();
  },
  beforeUpdate() {
    this.setMainLayoutsStyle();
  }
};
</script>

<style scoped>
#main-header {
  position: relative;
  vertical-align: middle;
}

#main-content {
  min-height: 90vh;
}

#main-footer {
  width: 100%;
  text-align: center;
  padding: 12px 50px;
}

.main-layout__bg {
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.85)),
    url("./assets/images/bg.jpg");
  background-position: center top;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
