<template>
  <div class="reset-password_container">
    <a-row type="flex" justify="space-around" align="middle">
      <a-col class="reset-password_forms" span="8">
        <a-card class="weddings_card" :bordered="false" :title="title">
          <ResetPasswordForm :resetPasswordToken="resetPasswordToken" @reseted="onReseted" />
        </a-card>
      </a-col>
    </a-row>
  </div>
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
    metaDescription() {
      return this.$root.$options.languages.lang.resetPassword.meta.description[
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
      // description
      meta: [
        { name: "description", content: this.metaDescription, vmid: "test" },
      ],
    };
  },
};
</script>
