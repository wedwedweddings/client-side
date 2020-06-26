<template>
  <a-layout class="privacypolicy__container">
    <a-layout-content>
      <a-row
        class="privacypolicy__row"
        type="flex"
        justify="center"
        align="middle"
      >
        <a-col class="privacypolicy__col" span="16">
          <!-- FAQ -->
          <h2>{{ title }}</h2>

          <p class="privacypolicy__main-description">{{ description }}</p>

          <!-- Dynamic -->
          <div :key="i" v-for="(l, i) in list">
            <h3>{{ l.title }}</h3>
            <p class="privacypolicy__main-description">{{ l.description }}</p>
          </div>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
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
    };
  },
};
</script>

<style lang="css" scoped>
.privacypolicy__container {
  background: none;
}

.privacypolicy__row {
  padding: 32px 0;
}

.privacypolicy__col {
  border-radius: 4px;
  background-color: white;
  margin: 32px 0;
  padding: 32px 64px;
}

.privacypolicy__row h2 {
  color: #4185a4;
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 2.5rem;
  margin-bottom: 32px;
  text-align: center;
}

.privacypolicy__main-description {
  font-size: 1rem;
  line-height: 1.25rem;
  margin-bottom: 32px;
}

.privacypolicy__row h3 {
  color: #4185a4;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5rem;
}

.privacypolicy__description {
  font-size: 1rem;
  line-height: 1.25rem;
  margin-bottom: 32px;
}

.privacypolicy__col-icon {
  text-align: center;
}

.privacypolicy__col-icon a {
  color: #4185a4;
  font-size: 1.75rem;
  text-align: center;
  transition: all 300ms;
}

.privacypolicy__col-icon a:hover {
  color: #db8979;
}
</style>
