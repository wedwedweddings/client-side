<template>
  <a-steps class="weddings_steps" direction="vertical" progress-dot :current="current">
    <a-step
      class="weddings_step"
      :key="index"
      :title="step.title"
      :description="step.description"
      v-for="(step, index) in steps"
    />
  </a-steps>
</template>

<script>
export default {
  name: "GettingStartedSteps",
  props: ["currentStep"],
  computed: {
    current() {
      return this.currentStep ? this.currentStep : 0;
    },
    // Lang
    steps() {
      const list = [];
      const langs = this.$root.$options.languages;

      for (let i = 0; i < langs.lang.gettingStarted.steps.length; i++) {
        list.push({
          title: langs.lang.gettingStarted.steps[i].title[langs.current],
          description:
            langs.lang.gettingStarted.steps[i].description[langs.current],
        });
      }

      return list;
    },
  },
};
</script>
