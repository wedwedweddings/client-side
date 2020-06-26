<template>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col span="8">
      <a-card class="forgot-password__card" :bordered="false" :title="title">
        <ForgotPasswordForm />
      </a-card>
    </a-col>
  </a-row>
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

<style scoped>
.forgot-password__card {
  border-radius: 4px;
  margin: 32px 0;
  width: 100%;
}
</style>
