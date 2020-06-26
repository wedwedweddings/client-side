<template>
  <a-layout class="faq__container">
    <a-layout-content>
      <a-row class="faq__row" type="flex" justify="center" align="middle">
        <a-col class="faq__col" span="16">
          <!-- FAQ -->
          <h2>FAQ</h2>

          <p class="faq__main-description">{{ description }}</p>

          <!--<h3>¿Cómo planificar tu boda con Wed Wed Weddings?</h3>

          <p
            class="faq__description"
          >Para organizar tu boda de manera sencilla con nosotros, los pasos a seguir son los siguientes:</p>

          <a-timeline>
            <a-timeline-item>Regístrate en nuestra web.</a-timeline-item>
            <a-timeline-item>Añade la información de tu boda (fecha, nombre de l@s novi@s, temática…).</a-timeline-item>
            <a-timeline-item>Crea la lista de invitados (puedes modificarla cuantas veces quieras).</a-timeline-item>
            <a-timeline-item>Agrega regalos a tu lista de bodas.</a-timeline-item>
            <a-timeline-item>Organiza las mesas de invitados de tu boda.</a-timeline-item>
            <a-timeline-item>Planifica el presupuesto del catering de tu boda.</a-timeline-item>
          </a-timeline>-->

          <!-- Dynamic -->
          <div :key="i" v-for="(f, i) in faqs">
            <h3>{{ f.title }}</h3>
            <p class="faq__main-description">{{ f.description }}</p>
          </div>

          <!-- Social Media -->
          <a-row type="flex">
            <a-col class="faq__col-icon" :span="1">
              <a href="https://www.instagram.com/wed.wed.weddings/">
                <a-icon type="instagram" />
              </a>
            </a-col>

            <a-col class="faq__col-icon" :span="1">
              <a href="https://www.facebook.com/plan.your.wwwedding">
                <a-icon type="facebook" />
              </a>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: "FAQ",
  computed: {
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.faq.meta.title[
        this.$root.$options.languages.current
      ];
    },
    description() {
      return this.$root.$options.languages.lang.faq.description[
        this.$root.$options.languages.current
      ];
    },
    faqs() {
      const filtered = [];

      for (
        let i = 0;
        i < this.$root.$options.languages.lang.faq.simple.length;
        i++
      ) {
        filtered.push({
          title: this.$root.$options.languages.lang.faq.simple[i].title[
            this.$root.$options.languages.current
          ],
          description: this.$root.$options.languages.lang.faq.simple[i]
            .description[this.$root.$options.languages.current],
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
.faq__container {
  background: none;
}

.faq__row {
  padding: 32px 0;
}

.faq__col {
  border-radius: 4px;
  background-color: white;
  margin: 32px 0;
  padding: 32px 64px;
}

.faq__row h2 {
  color: #4185a4;
  font-size: 2.5rem;
  font-weight: bold;
  line-height: 2.5rem;
  margin-bottom: 32px;
  text-align: center;
}

.faq__main-description {
  font-size: 1rem;
  line-height: 1.25rem;
  margin-bottom: 32px;
}

.faq__row h3 {
  color: #4185a4;
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1.5rem;
}

.faq__description {
  font-size: 1rem;
  line-height: 1.25rem;
  margin-bottom: 32px;
}

.faq__col-icon {
  text-align: center;
}

.faq__col-icon a {
  color: #4185a4;
  font-size: 1.75rem;
  text-align: center;
  transition: all 300ms;
}

.faq__col-icon a:hover {
  color: #db8979;
}
</style>
