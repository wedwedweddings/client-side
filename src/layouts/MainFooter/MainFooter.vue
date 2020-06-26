<template>
  <a-layout-content class="footer__main">
    <p>
      &copy; {{ year }} Wed Wed Weddings 💍🍽️💍 |
      <router-link :to="{ name: 'terms-and-conditions' }">&nbsp; {{ mainFooterTAC }} &nbsp;</router-link>|
      <router-link :to="{ name: 'privacy-policy' }">&nbsp;{{ mainFooterPP }}&nbsp;</router-link>
      |
      {{ mainFooterLove }}
      <a-icon class="footer__icon-heart" type="heart" />
    </p>
  </a-layout-content>
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
    }
  }
};
</script>

<style scoped>
a {
  color: #db8979;
  font-weight: bold;
  transition: all 300ms;
}

a:hover {
  text-shadow: 0 0 4px rgba(219, 137, 121, 0.65);
}

p {
  color: white;
  margin: 0;
}

.footer__icon-heart {
  cursor: pointer;
  transition: 300ms all;
}

.footer__icon-heart:hover {
  color: #db8979;
  filter: drop-shadow(0 0 4px #f3dfd0);
}
</style>
