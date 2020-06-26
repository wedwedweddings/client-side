import Vue from "vue";
import App from "./App.vue";
import { message, Modal } from "ant-design-vue";
import "./plugins/ant-design-vue.js";

// Languages
import { lang } from "../utils/lang";

// Router
import router from "./router";

Vue.config.productionTip = false;

// Confirm & Message
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$message = message;

new Vue({
  languages: {
    current: window.navigator.language === "es-ES" ? "es" : "en",
    lang,
  },
  router,
  render: (h) => h(App),
}).$mount("#app");
