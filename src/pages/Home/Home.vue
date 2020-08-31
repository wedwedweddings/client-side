<template>
  <div class="home_container">
    <div>
      <!-- Main -->
      <a-row class="home_main" type="flex" justify="center" align="middle">
        <a-col span="16">
          <div>
            <h1 class="heading-primary heading-primary--main" translate="no">
              Wed Wed
              <span class="heading--detail" translate="no">Weddings</span>
            </h1>

            <h3 class="heading-secondary" v-html="mainSubtitle"></h3>
          </div>

          <div class="button-container">
            <router-link :to="{ name: 'getting-started' }">
              <a-button class="button" size="large" ghost>{{ mainButton }}</a-button>
            </router-link>
          </div>
        </a-col>
      </a-row>
    </div>

    <div class="home_whyus-container">
      <!-- Why Us -->
      <a-row class="home_whyus" type="flex" justify="center" align="middle">
        <a-col :span="16">
          <h2>{{ whyUsTitle }}</h2>

          <a-row type="flex" justify="space-between" align="middle">
            <!-- Free -->
            <a-col :span="11">
              <h4 class="whyus_free">{{ whyUsFree }}</h4>
            </a-col>

            <!-- List -->
            <a-col :span="11">
              <a-timeline>
                <a-timeline-item
                  class="whyus_text"
                  :key="index"
                  v-for="(item, index) in whyUsTimeline"
                >{{ item }}</a-timeline-item>
              </a-timeline>
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <!-- Find Us -->
      <a-row class="home_findus" type="flex" justify="center" align="middle">
        <a-col :span="16">
          <h4>{{ findUsTitle }}</h4>

          <p v-html="findUsSubtitle"></p>

          <a-row type="flex" justify="center" align="middle">
            <a-col class="findus_icon-container" :span="1">
              <a href="https://www.instagram.com/wed.wed.weddings/">
                <a-icon type="instagram" />
              </a>
            </a-col>

            <a-col class="findus_icon-container" :span="1">
              <a href="https://www.facebook.com/plan.your.wwwedding">
                <a-icon type="facebook" />
              </a>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
// Components
export default {
  name: "Home",
  computed: {
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.home.meta.title[
        this.$root.$options.languages.current
      ];
    },
    mainSubtitle() {
      return this.$root.$options.languages.lang.home.main.subtitle[
        this.$root.$options.languages.current
      ];
    },
    mainButton() {
      return this.$root.$options.languages.lang.home.main.button[
        this.$root.$options.languages.current
      ];
    },
    whyUsTitle() {
      return this.$root.$options.languages.lang.home.whyUs.title[
        this.$root.$options.languages.current
      ];
    },
    whyUsTimeline() {
      const timeline = [];

      for (
        let i = 0;
        i < this.$root.$options.languages.lang.home.whyUs.timeline.length;
        i++
      ) {
        timeline.push(
          this.$root.$options.languages.lang.home.whyUs.timeline[i][
            this.$root.$options.languages.current
          ]
        );
      }

      return timeline;
    },
    whyUsFree() {
      return this.$root.$options.languages.lang.home.whyUs.free[
        this.$root.$options.languages.current
      ];
    },
    findUsTitle() {
      return this.$root.$options.languages.lang.home.findUs.title[
        this.$root.$options.languages.current
      ];
    },
    findUsSubtitle() {
      return this.$root.$options.languages.lang.home.findUs.subtitle[
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
