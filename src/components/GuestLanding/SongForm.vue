<template>
  <div>
    <!-- Artist -->
    <a-form-item class="weddings_form-item" prop="songArtist">
      <a-input
        name="songArtist"
        type="text"
        :defaultValue="song && song.artist !== '' ? song.artist : undefined"
        :placeholder="artistPlaceholder"
        autofocus
        @change="onChange"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Title -->
    <a-form-item class="weddings_form-item" prop="songTitle">
      <a-input
        name="songTitle"
        type="text"
        :defaultValue="song && song.title !== '' ? song.title : undefined"
        :placeholder="titlePlaceholder"
        @change="onChange"
      >
        <a-icon slot="prefix" type="fire" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- URL -->
    <a-form-item class="weddings_form-item" prop="songURL">
      <a-input
        name="songURL"
        type="text"
        :defaultValue="song && song.url !== '' ? song.url : undefined"
        :placeholder="urlPlaceholder"
        @change="onChange"
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
    onChange(e) {
      let name;

      switch (e.target.name) {
        case "songArtist":
          name = "artist";
          break;

        case "songTitle":
          name = "title";
          break;

        case "songURL":
          name = "url";
          break;
      }

      if (!name) return;

      this.inner[name] = e.target.value;

      this.$emit("change", this.inner);
    },
    // Remove song
    onRemove() {
      this.$emit("remove", this.index);
    },
  },

  created() {
    this.inner = this.song
      ? this.song
      : {
          artist: "",
          title: "",
          url: "",
        };
  },
};
</script>