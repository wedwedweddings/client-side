<template>
  <div class="home__container">
    <div>
      <!-- Main -->
      <a-row class="home__row home__main" type="flex" justify="center" align="middle">
        <a-col span="16">
          <div>
            <h1 translate="no">
              Wed Wed
              <span class="home__title__detail" translate="no">Weddings</span>
            </h1>

            <h3 v-html="mainSubtitle"></h3>
          </div>

          <div class="home__button-container">
            <router-link :to="{ name: 'getting-started' }">
              <a-button class="home__button" size="large" ghost>
                {{
                mainButton
                }}
              </a-button>
            </router-link>
          </div>
        </a-col>
      </a-row>
    </div>

    <div style="background-color: #db8979;">
      <!-- Why Us -->
      <a-row class="home__row home__whyus" type="flex" justify="center" align="middle">
        <a-col class="home__whyus-col" :span="16">
          <h2>{{ whyUsTitle }}</h2>

          <a-row type="flex" justify="space-between" align="middle">
            <!-- Free -->
            <a-col class="home__whyus-sub-col" :span="11">
              <h3 class="home__whyus-free">{{ whyUsFree }}</h3>
            </a-col>

            <!-- List -->
            <a-col class="home__whyus-sub-col" :span="11">
              <a-timeline>
                <a-timeline-item
                  class="home__whyus-text"
                  :key="index"
                  v-for="(item, index) in whyUsTimeline"
                >{{ item }}</a-timeline-item>
              </a-timeline>
            </a-col>
          </a-row>
        </a-col>
      </a-row>

      <!-- Find Us -->
      <a-row class="home__row home__contactus" type="flex" justify="center" align="middle">
        <a-col class="home__contactus-col" :span="16">
          <h3>{{ findUsTitle }}</h3>

          <p v-html="findUsSubtitle"></p>

          <a-row type="flex" justify="center" align="middle">
            <a-col class="home__contactus-col-icon" :span="1">
              <a href="https://www.instagram.com/wed.wed.weddings/">
                <a-icon type="instagram" />
              </a>
            </a-col>

            <a-col class="home__contactus-col-icon" :span="1">
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
    }
  },
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.metaTitle,
      // all titles will be injected into this template
      titleTemplate: "%s | Wed Wed Weddings"
    };
  }
};
</script>

<style>
.home__container {
  background: none;
}

/* Main */
.home__main {
  height: 85vh;
}

.home__main h1 {
  color: rgba(255, 255, 255, 0.85);
  font-size: 6rem;
  font-weight: bold;
  line-height: 6rem;
  text-align: center;
  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.35);
}

.home__main h3 {
  color: rgba(255, 255, 255, 0.85);
  font-size: 2rem;
  font-weight: bold;
  line-height: 2rem;
  text-align: center;
  text-shadow: 0px 0px 12px rgba(0, 0, 0, 0.35);
}

.home__title__detail {
  filter: drop-shadow(0 0 0.2rem #e1e9f2);
}

.home__button-container {
  margin: 64px 0;
  text-align: center;
}

.home__button {
  background-color: transparent;
  border: 1px solid #db8979;
  color: #db8979;
}

.home__button:hover {
  background-color: #db8979 !important;
  color: white;
}

/* Why Us */
.home__whyus {
  background-color: white;
  clip-path: polygon(0 0, 100% 0, 100% 88%, 50% 100%, 0% 88%);
  padding: 72px 0;
}

.home__whyus h2 {
  color: #4185a4;
  font-size: 2rem;
  font-weight: bold;
  line-height: 2rem;
  margin-bottom: 64px;
  text-align: center;
}

.home__whyus-text {
  color: rgba(0, 0, 0, 0.65);
  font-size: 1.1rem !important;
  line-height: 1.25rem;
}

.home__whyus-sub-col:first-child {
  text-align: right;
}

.home__whyus-free {
  color: #4185a4;
  font-size: 8rem;
  font-weight: bold;
  line-height: 8rem;
  padding-bottom: 16px;
}

/* Contact Us */
.home__contactus {
  background-color: #db8979;
  padding: 72px 0;
}

.home__contactus h3 {
  color: rgba(255, 255, 255, 0.85);
  font-size: 2rem;
  font-weight: bold;
  line-height: 2rem;
  text-align: center;
  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
}

.home__contactus p {
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.25rem;
  line-height: 1.5rem;
  text-align: center;
}

.home__contactus-col-icon {
  margin: 16px 0;
  text-align: center;
}

.home__contactus-col-icon a {
  color: white;
  font-size: 1.75rem;
  text-align: center;
  transition: all 300ms;
}

.home__contactus-col-icon a:hover {
  color: #f3dfd0;
}
</style>
