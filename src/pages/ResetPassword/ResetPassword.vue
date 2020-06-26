<template>
  <a-row type="flex" justify="space-around" align="middle">
    <a-col span="8">
      <a-card class="reset-password__card" :bordered="false" :title="title">
        <ResetPasswordForm
          :resetPasswordToken="resetPasswordToken"
          @reseted="onReseted"
        />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import ResetPasswordForm from "../../layouts/ResetPasswordForm/ResetPasswordForm";

export default {
  name: "ResetPassword",
  components: {
    ResetPasswordForm,
  },
  computed: {
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.resetPassword.meta.title[
        this.$root.$options.languages.current
      ];
    },
    title() {
      return this.$root.$options.languages.lang.resetPassword.title[
        this.$root.$options.languages.current
      ];
    },
  },
  data: () => ({
    resetPasswordToken: "",
  }),
  methods: {
    onReseted() {
      this.$router.push("/login");
    },
  },
  mounted() {
    this.resetPasswordToken = this.$route.params.token;
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
.reset-password__card {
  border-radius: 4px;
  margin: 32px 0;
  width: 100%;
}
</style>
