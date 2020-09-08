<template>
  <div class="home_container">
    <!-- Main -->
    <a-row class="home_main" type="flex" justify="center" align="middle">
      <a-col span="16">
        <div>
          <h1 class="heading-primary heading-primary--main" translate="no">Wed Wed Weddings</h1>

          <h3 class="heading-secondary" v-html="mainSubtitle"></h3>
        </div>

        <div class="button-container">
          <router-link :to="{ name: 'getting-started' }">
            <a-button class="button" size="large" ghost>{{ mainButton }}</a-button>
          </router-link>
        </div>
      </a-col>
    </a-row>

    <!-- Why Us -->
    <div class="whyus_container">
      <!-- Title -->
      <div class="whyus_title">
        <h2>{{ whyUsTitle }}</h2>
      </div>

      <!-- Timeline -->
      <a-row class="whyus_timeline" type="flex" justify="center" align="middle">
        <!-- Free -->
        <a-col class="whyus_free-block" :span="11">
          <p class="whyus_free">{{ whyUsFree }}</p>
        </a-col>

        <!-- List -->
        <a-col class="whyus_list" :span="11">
          <a-timeline>
            <a-timeline-item
              class="whyus_text"
              :key="index"
              v-for="(item, index) in whyUsTimeline"
            >{{ item }}</a-timeline-item>
          </a-timeline>
        </a-col>
      </a-row>

      <!-- Row 1 -->
      <a-row class="whyus_image">
        <!-- Text -->
        <a-col class="col--1l" :span="12">
          <p class="home_txt" v-for="(p, i) in whyUsRow(1)" :key="`row-${i}`">{{ p }}</p>
        </a-col>

        <!-- Image -->
        <a-col class="col--1r" :span="12">
          <img
            src="https://res.cloudinary.com/wedwedweddings/image/upload/v1598987101/wedwedweddings.com/images/home-01_jowckk.jpg"
            :alt="whyUsImageAlt1"
          />
        </a-col>
      </a-row>

      <!-- Row 2 -->
      <a-row class="whyus_image">
        <!-- Image -->
        <a-col class="col--2l" :span="12">
          <img
            src="https://res.cloudinary.com/wedwedweddings/image/upload/v1599030279/wedwedweddings.com/images/home-03_sjmi08.jpg"
            :alt="whyUsImageAlt2"
          />
        </a-col>

        <!-- Text -->
        <a-col class="col--2r" :span="12">
          <p class="home_txt" v-for="(p, i) in whyUsRow(2)" :key="`row-${i}`">{{ p }}</p>
        </a-col>
      </a-row>

      <!-- Intro -->
      <div class="whyus_intro">
        <p class="home_txt">{{ intro }}</p>
      </div>

      <div class="whyus_wrapper--colored">
        <!-- Highlights -->
        <a-row class="whyus_highlights" type="flex" justify="center">
          <a-col v-for="(h, i) in whyUsHighlights" class="whyus_highlight" :key="i" :span="5">
            <h4>
              <a-icon :type="highlights.icons[i]" />
            </h4>
            <p class="home_txt">{{ h }}</p>
          </a-col>
        </a-row>
      </div>
    </div>

    <!-- Find Us -->
    <a-row class="findus_container" type="flex" justify="center" align="middle">
      <a-col :span="16">
        <h4>{{ findUsTitle }}</h4>

        <p class="home_txt" v-html="findUsSubtitle"></p>

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
</template>

<script>
// Components
export default {
  name: "Home",
  data: () => ({
    highlights: {
      icons: ["mail", "gift", "play-circle", "read"],
    },
  }),
  computed: {
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.home.meta.title[
        this.$root.$options.languages.current
      ];
    },
    metaDescription() {
      return this.$root.$options.languages.lang.home.meta.description[
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
    intro() {
      return this.$root.$options.languages.lang.home.whyUs.intro[
        this.$root.$options.languages.current
      ];
    },
    whyUsImageAlt1() {
      return this.$root.$options.languages.lang.home.whyUs.images[0][
        this.$root.$options.languages.current
      ];
    },
    whyUsImageAlt2() {
      return this.$root.$options.languages.lang.home.whyUs.images[1][
        this.$root.$options.languages.current
      ];
    },
    whyUsTimeline() {
      const timeline = this.$root.$options.languages.lang.home.whyUs.timeline.map(
        (item) => {
          return item[this.$root.$options.languages.current];
        }
      );

      return timeline;
    },
    whyUsFree() {
      return this.$root.$options.languages.lang.home.whyUs.free[
        this.$root.$options.languages.current
      ];
    },
    whyUsHighlights() {
      const highlights = this.$root.$options.languages.lang.home.whyUs.highlights.map(
        (item) => {
          return item[this.$root.$options.languages.current];
        }
      );

      return highlights;
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
  methods: {
    whyUsRow(index) {
      if (index !== 1 && index !== 2) return [];

      const row = this.$root.$options.languages.lang.home.whyUs[
        `row${index}`
      ].map((item) => {
        return item[this.$root.$options.languages.current];
      });

      return row;
    },
  },
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.metaTitle,
      // all titles will be injected into this template
      titleTemplate: "%s | Wed Wed Weddings 💍",
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
