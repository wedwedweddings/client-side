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
    <div class="whyus-findus_container">
      <a-row class="whyus_title" type="flex" justify="center" align="middle">
        <a-col :span="16">
          <h2>{{ whyUsTitle }}</h2>
        </a-col>
      </a-row>

      <a-row class="whyus_image">
        <a-col class="col--1l" :span="12">
          <p class="txt-welcome">Antes de nada… ¡Felicidades por vuestro compromiso!</p>

          <p
            class="txt-welcome"
          >Si habéis llegado hasta aquí, es porque estáis muy cerca de dar el ‘’sí, quiero’’.</p>

          <p
            class="txt-welcome"
          >Somos conscientes de que necesitáis organizar muchas cosas antes de la boda y nuestra razón de ser, precisamente es la de aliviar algunos de esos dolores de cabeza a través de Wed Wed Weddings.</p>

          <p
            class="txt-welcome"
          >Esta web está diseñada para conseguir hacer más llevaderas ciertas preparaciones que son fundamentales para que vuestra celebración salga a pedir de boca.</p>

          <p class="txt-welcome">¿Quieres saber cómo vamos a ayudaros?</p>
        </a-col>
        <a-col class="col--1r" :span="12">
          <img
            src="https://res.cloudinary.com/wedwedweddings/image/upload/v1598987101/wedwedweddings.com/images/home-01_jowckk.jpg"
            alt="Weddings"
          />
        </a-col>
      </a-row>

      <a-row class="whyus_image">
        <a-col class="col--2l" :span="12">
          <img
            src="https://res.cloudinary.com/wedwedweddings/image/upload/v1599030279/wedwedweddings.com/images/home-03_sjmi08.jpg"
            alt="Weddings"
          />
        </a-col>

        <a-col class="col--2r" :span="12">
          <p
            class="txt-welcome"
          >A continuación, vamos a enumerar qué factores debéis tener en cuenta justo antes de comenzar a preparar una boda en Wed Wed Weddings.</p>

          <ul>
            <li class="txt-welcome">💰 Fijar vuestro presupuesto.</li>
            <li
              class="txt-welcome"
            >🧮 Crear una lista de proveedores para el catering y sus precios.</li>
            <li class="txt-welcome">💃 Organizar vuestra lista de invitados.</li>
            <li class="txt-welcome">🎁 Tener ideas para vuestra lista de regalos de boda.</li>
            <li
              class="txt-welcome"
            >👩‍💻 Disponer de tiempo de sobra para organizarlo todo adecuadamente.</li>
          </ul>

          <p class="txt-welcome"></p>
        </a-col>
      </a-row>

      <a-row class="whyus_list-container" type="flex" justify="center" align="middle">
        <a-col :span="16">
          <a-row class="whyus_list--intro" type="flex" justify="center">
            <a-col :span="16">
              <p
                class="txt-welcome"
              >Una vez que tengáis claro algunos, o todos los elementos que hemos enumerado, os mostramos las funciones o herramientas que ponemos a vuestra disposición:</p>
            </a-col>
          </a-row>

          <a-row type="flex" justify="space-between" align="middle">
            <!-- Free -->
            <a-col class="whyus_list--free" :span="11">
              <h4 class="whyus_free">{{ whyUsFree }}</h4>
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
    /*whyUsRow1() {
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
    },*/
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
