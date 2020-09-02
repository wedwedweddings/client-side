<template>
  <div class="faq_container">
    <a-row class="faq_row" type="flex" justify="center" align="middle">
      <a-col class="faq_col" span="16">
        <!-- FAQ -->
        <h2>FAQ</h2>

        <!--<h3><p>{{ description }}</p>

        ¿Cómo planificar tu boda con Wed Wed Weddings?</h3>

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
          <p>{{ f.description }}</p>
        </div>

        <!-- Social Media -->
        <a-row type="flex">
          <a-col class="faq-icon" :span="1">
            <a href="https://www.instagram.com/wed.wed.weddings/">
              <a-icon type="instagram" />
            </a>
          </a-col>

          <a-col class="faq-icon" :span="1">
            <a href="https://www.facebook.com/plan.your.wwwedding">
              <a-icon type="facebook" />
            </a>
          </a-col>
        </a-row>

        <h3>Creditos</h3>

        <a href="https://www.freepik.es/fotos/boda">Foto de Boda creado por freepik - www.freepik.es</a>
      </a-col>
    </a-row>
  </div>
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