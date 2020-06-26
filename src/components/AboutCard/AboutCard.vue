<template>
  <a-card hoverable>
    <img
    class="about__img"
      :alt="name"
      :src="img"
      slot="cover"
    />
    <a-card-meta :title="name">
      <template slot="description">{{ description }}</template>
    </a-card-meta>
  </a-card>
</template>

<script>
export default {
  name: "AboutCard",
  props: {
      img: {
          type: String
      },
      name: {
          type: String
      },
      description: {
          type: String
      }
  }
};
</script>
