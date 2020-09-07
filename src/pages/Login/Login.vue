<template>
  <div class="login_container">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col class="login_forms" span="8">
        <a-card class="weddings_card" :bordered="false" :title="title">
          <LoginForm />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import LoginForm from "../../layouts/LoginForm/LoginForm";

export default {
  name: "Login",
  components: {
    LoginForm,
  },
  computed: {
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.login.meta.title[
        this.$root.$options.languages.current
      ];
    },
    metaDescription() {
      return this.$root.$options.languages.lang.login.meta.description[
        this.$root.$options.languages.current
      ];
    },
    title() {
      return this.$root.$options.languages.lang.login.title[
        this.$root.$options.languages.current
      ];
    },
  },
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.metaTitle,
      // all titles will be injected into this template
      titleTemplate: "%s | Wed Wed Weddings",
      // description
      meta: [
        {
          name: "description",
          content: this.metaDescription,
          vmid: "description",
        },
      ],
    };
  },
};
</script>
