<template>
  <div class="privacy-policy_container">
    <a-row class="privacy-policy_row" type="flex" justify="center" align="middle">
      <a-col class="privacy-policy_col" span="16">
        <!-- FAQ -->
        <h2>{{ title }}</h2>

        <p>{{ description }}</p>

        <!-- Dynamic -->
        <div :key="i" v-for="(l, i) in list">
          <h3>{{ l.title }}</h3>
          <p>{{ l.description }}</p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "PrivacyPolicy",
  computed: {
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.privacyPolicy.meta.title[
        this.$root.$options.languages.current
      ];
    },
    metaDescription() {
      return this.$root.$options.languages.lang.privacyPolicy.meta.description[
        this.$root.$options.languages.current
      ];
    },
    title() {
      return this.$root.$options.languages.lang.privacyPolicy.title[
        this.$root.$options.languages.current
      ];
    },
    description() {
      return this.$root.$options.languages.lang.privacyPolicy.description[
        this.$root.$options.languages.current
      ];
    },
    list() {
      const filtered = [];

      for (
        let i = 0;
        i < this.$root.$options.languages.lang.privacyPolicy.simple.length;
        i++
      ) {
        filtered.push({
          title: this.$root.$options.languages.lang.privacyPolicy.simple[i]
            .title[this.$root.$options.languages.current],
          description: this.$root.$options.languages.lang.privacyPolicy.simple[
            i
          ].description[this.$root.$options.languages.current],
        });
      }

      return filtered;
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
        { name: "description", content: this.metaDescription, vmid: "test" },
      ],
    };
  },
};
</script>