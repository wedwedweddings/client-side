<template>
  <div class="faq_container">
    <a-row class="faq_row" type="flex" justify="center" align="middle">
      <a-col class="faq_col" span="16">
        <!-- FAQ -->
        <h2>FAQ</h2>

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

        <a-divider></a-divider>

        <!-- Credits -->
        <h3>Créditos</h3>
        <a href="https://www.freepik.es/fotos/boda">Foto de Boda creado por freepik - www.freepik.es</a>

        <br />

        <a
          href="https://www.freepik.es/fotos/tecnologia"
        >Foto de Tecnología creado por pressahotkey - www.freepik.es</a>
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
    metaDescription() {
      return this.$root.$options.languages.lang.faq.meta.description[
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