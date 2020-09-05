<template>
  <div>
    <!-- Artist -->
    <a-form-item class="weddings_form-item" prop="songArtist">
      <a-input
        v-decorator="[
          'songArtist',
        ]"
        type="text"
        :placeholder="artistPlaceholder"
        @change="onChangeArtist"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Title -->
    <a-form-item class="weddings_form-item" prop="songTitle">
      <a-input
        v-decorator="[
          'songTitle',
        ]"
        type="text"
        :placeholder="titlePlaceholder"
        @change="onChangeTitle"
      >
        <a-icon slot="prefix" type="fire" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- URL -->
    <a-form-item class="weddings_form-item" prop="songURL">
      <a-input
        v-decorator="[
          'songURL',
        ]"
        type="text"
        :placeholder="urlPlaceholder"
        @change="onChangeURL"
      >
        <a-icon slot="prefix" type="global" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
  </div>
</template>

<script>
export default {
  name: "SongForm",
  data: () => ({
    inner: {},
  }),
  props: {
    song: {
      type: Object,
    },
  },
  computed: {
    // Lang
    artistPlaceholder() {
      return this.$root.$options.languages.lang.tablesPlanner.songsForm
        .placeholders.artist[this.$root.$options.languages.current];
    },
    titlePlaceholder() {
      return this.$root.$options.languages.lang.tablesPlanner.songsForm
        .placeholders.title[this.$root.$options.languages.current];
    },
    urlPlaceholder() {
      return this.$root.$options.languages.lang.tablesPlanner.songsForm
        .placeholders.url[this.$root.$options.languages.current];
    },
  },
  methods: {
    onChangeArtist(e) {
      if (this.song) {
        this.inner = this.song;
      }

      this.inner.artist = e.target.value;

      this.$emit("change", this.inner);
    },
    onChangeTitle(e) {
      if (this.song) {
        this.inner = this.song;
      }

      this.inner.title = e.target.value;

      this.$emit("change", this.inner);
    },
    onChangeURL(e) {
      if (this.song) {
        this.inner = this.song;
      }

      this.inner.url = e.target.value;

      this.$emit("change", this.inner);
    },
    // Remove song
    onRemove() {
      this.$emit("remove", this.index);
    },
  },
  created() {
    this.inner = this.song ? this.song : { artist: "", title: "", url: "" };
  },
};
</script>