<template>
  <p>
    &copy; {{ year }} Wed Wed Weddings 💍🍽️💍 |
    <router-link :to="{ name: 'terms-and-conditions' }">&nbsp; {{ mainFooterTAC }} &nbsp;</router-link>|
    <router-link :to="{ name: 'privacy-policy' }">&nbsp;{{ mainFooterPP }}&nbsp;</router-link>
    |
    {{ mainFooterLove }}
    <a-icon class="icon--heart" type="heart" />
  </p>
</template>

<script>
export default {
  name: "MainFooter",
  computed: {
    year: () => {
      const d = new Date();
      return d.getFullYear();
    },
    // Lang
    mainFooterTAC() {
      return this.$root.$options.languages.lang.common.mainFooter
        .termsAndConditions[this.$root.$options.languages.current];
    },
    mainFooterPP() {
      return this.$root.$options.languages.lang.common.mainFooter.privacyPolicy[
        this.$root.$options.languages.current
      ];
    },
    mainFooterLove() {
      return this.$root.$options.languages.lang.common.mainFooter.love[
        this.$root.$options.languages.current
      ];
    },
  },
};
</script>
