<template>
  <div class="terms-and-conditions_container">
    <a-row class="terms-and-conditions_row" type="flex" justify="center" align="middle">
      <a-col class="terms-and-conditions_col" span="16">
        <!-- FAQ -->
        <h2>{{ title }}</h2>

        <p>{{ description }}</p>

        <!-- Dynamic -->
        <div :key="i" v-for="(l, i) in list">
          <p>{{ l }}</p>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: "TermsAndConditions",
  computed: {
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.termsAndConditions.meta.title[
        this.$root.$options.languages.current
      ];
    },
    metaDescription() {
      return this.$root.$options.languages.lang.termsAndConditions.meta
        .description[this.$root.$options.languages.current];
    },
    title() {
      return this.$root.$options.languages.lang.termsAndConditions.title[
        this.$root.$options.languages.current
      ];
    },
    description() {
      return this.$root.$options.languages.lang.termsAndConditions.description[
        this.$root.$options.languages.current
      ];
    },
    list() {
      const filtered = [];

      for (
        let i = 0;
        i < this.$root.$options.languages.lang.termsAndConditions.list.length;
        i++
      ) {
        filtered.push(
          this.$root.$options.languages.lang.termsAndConditions.list[i][
            this.$root.$options.languages.current
          ]
        );
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
        {
          name: "description",
          content: this.metaDescription,
          vmid: "description",
        },
      ],
    };
  },
};
</script>