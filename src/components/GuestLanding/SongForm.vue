<template>
  <div>
    <!-- Artist -->
    <a-form-model-item class="weddings_form-item" prop="songArtist">
      <a-input
        type="text"
        v-model="song.artist"
        :change="onChange"
        :placeholder="songArtist"
        autofocus
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>

    <!-- Title -->
    <a-form-model-item class="weddings_form-item" prop="songTitle">
      <a-input type="text" v-model="song.title" :change="onChange" :placeholder="songTitle">
        <a-icon slot="prefix" type="fire" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>

    <!-- URL -->
    <a-form-model-item class="weddings_form-item" prop="songURL">
      <a-input type="text" v-model="song.url" :change="onChange" :placeholder="songURL">
        <a-icon slot="prefix" type="global" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
  </div>
</template>

<script>
export default {
  name: "SongForm",
  props: {
    song: {
      type: Object,
      required: true,
      default() {
        return { artist: "", title: "", url: "" };
      },
    },
  },
  computed: {
    // Lang
    songArtist() {
      return this.$root.$options.languages.lang.guestLanding.songArtist[
        this.$root.$options.languages.current
      ];
    },
    songTitle() {
      return this.$root.$options.languages.lang.guestLanding.songTitle[
        this.$root.$options.languages.current
      ];
    },
    songURL() {
      return this.$root.$options.languages.lang.guestLanding.songURL[
        this.$root.$options.languages.current
      ];
    },
  },
  model: {
    prop: "song",
    event: "change",
  },
  methods: {
    // Any change
    onChange() {
      this.$emit("change", {
        companion: this.companion,
        index: this.index,
      });
    },

    // Remove song
    onRemove() {
      this.$emit("remove", this.index);
    },
  },
};
</script>