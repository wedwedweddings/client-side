<template>
  <div class="guest-landing_container">
    <!-- Title & Subtitle -->
    <h1>{{ title }}</h1>
    <h2>{{ subtitle }}</h2>

    <!-- Guest & Companion(s) forms -->
    <a-row type="flex" justify="center" align="middle">
      <a-col class="weddings_forms" span="8">
        <GuestLandingForms />
      </a-col>
    </a-row>
  </div>
</template>

<script>
import GuestLandingForms from "../../layouts/GuestLandingForms/GuestLandingForms";
// import PresentForm from "../../layouts/PresentForm/PresentForm";

export default {
  name: "GuestLanding",
  components: {
    GuestLandingForms,
    // PresentForm,
  },
  computed: {
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.guestLanding.meta.title[
        this.$root.$options.languages.current
      ];
    },
    title() {
      return this.$root.$options.languages.lang.guestLanding.title[
        this.$root.$options.languages.current
      ];
    },
    subtitle() {
      return this.$root.$options.languages.lang.guestLanding.subtitle[
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
