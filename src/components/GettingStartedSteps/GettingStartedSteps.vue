<template>
  <a-steps class="steps__container" direction="vertical" :current="current">
    <a-step
      class="steps__step"
      :key="index"
      :title="step"
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

      for (
        let i = 0;
        i < this.$root.$options.languages.lang.gettingStarted.steps.length;
        i++
      ) {
        list.push(
          this.$root.$options.languages.lang.gettingStarted.steps[i][
            this.$root.$options.languages.current
          ]
        );
      }

      return list;
    },
  },
};
</script>

<style>
.ant-steps-item-title {
  color: white !important;
}

.steps__container {
  padding: 0 0 0 48px;
}
</style>
