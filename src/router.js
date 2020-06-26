import Vue from "vue";
import Router from "vue-router";
import Meta from "vue-meta";

// Layouts

// Pages
import GettingStarted from "./pages/GettingStarted/GettingStarted";
import FAQ from "./pages/FAQ/FAQ";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import GuestLanding from "./pages/GuestLanding/GuestLanding";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import TablesPlanner from "./pages/TablesPlanner/TablesPlanner";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions";

// Hooks
import hooks from "./hooks";

// Use Router
Vue.use(Router);

// Use Meta
Vue.use(Meta);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "index",
      components: {
        default: Home,
      },
    },
    {
      path: "/faq",
      name: "faq",
      components: {
        default: FAQ,
      },
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      components: {
        default: ForgotPassword,
      },
    },
    {
      path: "/getting-started",
      name: "getting-started",
      components: {
        default: GettingStarted,
      },
    },
    {
      path: "/guest-updates/:token",
      name: "guest-updates",
      components: {
        default: GuestLanding,
      },
    },
    {
      path: "/home",
      name: "home",
      components: {
        default: Home,
      },
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: Login,
      },
    },
    {
      path: "/privacy-policy",
      name: "privacy-policy",
      components: {
        default: PrivacyPolicy,
      },
    },
    {
      path: "/reset-password/:token",
      name: "reset-password",
      components: {
        default: ResetPassword,
      },
    },
    {
      path: "/tables-planner",
      name: "tables-planner",
      components: {
        default: TablesPlanner,
      },
      meta: {
        //requireAuth: true
      },
    },
    {
      path: "/terms-and-conditions",
      name: "terms-and-conditions",
      components: {
        default: TermsAndConditions,
      },
    },
    {
      path: "*",
      name: "not-found",
      components: {
        default: Home,
      },
    },
  ],
});

hooks(router);

export default router;
