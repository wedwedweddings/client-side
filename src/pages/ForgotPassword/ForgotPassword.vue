<template>
  <div class="forgot-password_container">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col class="forgot-password_forms" span="8">
        <a-card class="weddings_card" :bordered="false" :title="title">
          <ForgotPasswordForm />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import ForgotPasswordForm from "../../layouts/ForgotPasswordForm/ForgotPasswordForm";

export default {
  name: "ForgotPassword",
  components: {
    ForgotPasswordForm,
  },
  computed: {
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.forgotPassword.meta.title[
        this.$root.$options.languages.current
      ];
    },
    title() {
      return this.$root.$options.languages.lang.forgotPassword.title[
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
    };
  },
};
</script>
