<template>
  <div class="menu-song-list_container">
    <!-- Divider -->
    <a-divider class="divider" orientation="left">
      {{ songsTitle }}
      <a-tag :color="colors.lakeshore.hex">
        <strong>{{ songs.length }}</strong>
        {{ emojis.music }}
      </a-tag>

      <a-button
        class="btn-add"
        size="small"
        type="primary"
        ghost
        @click="onSongModal"
      >{{ addButton }}</a-button>
    </a-divider>

    <!-- Songs List -->
    <a-row>
      <a-col>
        <div class="settings-songs__list-infinite-container" :infinite-scroll-distance="distance">
          <a-list size="small" :dataSource="songs">
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              style="border-bottom: 1px solid #8CBDD2"
            >
              <Song :song="item" @deletedSong="onDeleted" @updateSong="onUpdate" />
            </a-list-item>
          </a-list>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// Components
import Song from "../../components/Song/Song";

// Utils
import colors from "../../../utils/colors";
import emojis from "../../../utils/emojis";

export default {
  name: "MenuSongList",
  components: {
    Song,
  },
  props: ["content"],
  data: () => ({
    colors,
    distance: 10,
    emojis,
    songs: [],
    show: true,
  }),
  computed: {
    // Lang
    songsTitle() {
      return this.$root.$options.languages.lang.tablesPlanner.menu.songs[
        this.$root.$options.languages.current
      ];
    },
    addButton() {
      return this.$root.$options.languages.lang.tablesPlanner.menu.addButton[
        this.$root.$options.languages.current
      ];
    },
  },
  methods: {
    onDeleted(songId) {
      this.$emit("deletedSong", songId);
    },
    onSongModal() {
      this.$emit("songModal");
    },
    onUpdate(song) {
      this.$emit("updateSong", song);
    },
  },
  watch: {
    content() {
      this.songs = this.content ? this.content : [];
    },
  },
};
</script>

<style>
.settings-songs__divider {
  color: #e1e9f2;
  margin-right: 8px;
}

.settings-songs__divider-marriage {
  margin: 0 4px;
  cursor: pointer;
}
.settings-songs__list-infinite-container {
  background: white;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  max-height: 340px;
}

.settings-songs__list-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}

.ant-list-item-meta-description {
  font-size: 12px;
}
</style>
