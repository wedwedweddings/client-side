<template>
  <div class="guest-landing_container">
    <!-- Title & Subtitle -->
    <h1>{{ title }}</h1>
    <h2>{{ subtitle }}</h2>

    <a-row type="flex" justify="center">
      <!-- Guest, Companion(s) and Song forms -->
      <a-col class="weddings_forms main-guest_col" :span="8">
        <GuestLandingCol1 />
      </a-col>

      <!-- MenuPresentList
      <a-col class="weddings_forms present_col" :span="6">
        <GuestLandingCol2 />
      </a-col>-->
    </a-row>
  </div>
</template>

<script>
// Layouts
import GuestLandingCol1 from "../../layouts/GuestLandingCols/GuestLandingCol1";
// import GuestLandingCol2 from "../../layouts/GuestLandingCols/GuestLandingCol2";

export default {
  name: "GuestLanding",
  components: {
    GuestLandingCol1,
    // GuestLandingCol2,
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
