<template>
  <a-layout class="guest-landing__container">
    <a-layout-content>
      <a-row type="flex" justify="space-around" align="middle">
        <a-col span="8">
          <a-card class="guest-landing__card" :bordered="false" :title="title">
            <GuestLandingForm />
          </a-card>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import GuestLandingForm from "../../layouts/GuestLandingForm/GuestLandingForm";

export default {
  name: "GuestLanding",
  components: {
    GuestLandingForm
  },
  computed: {
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.login.meta.title[
        this.$root.$options.languages.current
      ];
    },
    title() {
      return this.$root.$options.languages.lang.login.title[
        this.$root.$options.languages.current
      ];
    }
  },
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.metaTitle,
      // all titles will be injected into this template
      titleTemplate: "%s | Wed Wed Weddings"
    };
  }
};
</script>

<style scoped>
.guest-landing__container {
  background: none;
}

.guest-landing__card {
  border-radius: 4px;
  margin: 64px 0;
}
</style>
