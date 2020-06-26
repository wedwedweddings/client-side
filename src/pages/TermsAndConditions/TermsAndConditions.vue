<template>
  <a-layout class="termsandconditions__container">
    <a-layout-content>
      <a-row
        class="termsandconditions__row"
        type="flex"
        justify="center"
        align="middle"
      >
        <a-col class="termsandconditions__col" span="16">
          <!-- FAQ -->
          <h2>{{ title }}</h2>

          <p class="termsandconditions__main-description">{{ description }}</p>

          <!-- Dynamic -->
          <div :key="i" v-for="(l, i) in list">
            <p class="termsandconditions__main-description">{{ l }}</p>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
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
    };
  },
};
</script>

<style lang="css" scoped>
.termsandconditions__container {
  background: none;
}

.termsandconditions__row {
  padding: 32px 0;
}

.termsandconditions__col {
  border-radius: 4px;
  background-color: white;
  margin: 32px 0;
  padding: 32px 64px;
}

.termsandconditions__row h2 {
  color: #4185a4;
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 2.5rem;
  margin-bottom: 32px;
  text-align: center;
}

.termsandconditions__main-description {
  font-size: 1.25rem;
  line-height: 1.5rem;
  margin-bottom: 32px;
}

.termsandconditions__row h3 {
  color: #4185a4;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5rem;
}

.termsandconditions__description {
  font-size: 1rem;
  line-height: 1.25rem;
  margin-bottom: 32px;
}

.termsandconditions__col-icon {
  text-align: center;
}

.termsandconditions__col-icon a {
  color: #4185a4;
  font-size: 1.75rem;
  text-align: center;
  transition: all 300ms;
}

.termsandconditions__col-icon a:hover {
  color: #db8979;
}
</style>
