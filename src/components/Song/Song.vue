<template>
  <a-list-item-meta>
    <a :href="song && song.url ? song.url : '#'" slot="title" target="_blank">
      <a-icon class="song-item__global" type="global" style="margin-right:8px;" />
    </a>

    <span slot="title" style="cursor:pointer;" @click="onUpdate">{{ song ? song.title : '' }}</span>
    <span slot="description">{{ song ? song.artist : '' }}</span>

    <a-tooltip placement="right" slot="title" :title="guestFullName">
      <span style="margin-left:8px;" v-if="marked">{{ emojis.checked }}</span>
    </a-tooltip>

    <a-icon
      slot="title"
      type="delete"
      style="float:right; margin-top:4px;"
      @click="onDeleteConfirm(ref)"
    />
  </a-list-item-meta>
</template>

<script>
// Models
import { getOneInWedding as gogiw } from "../../models/guest";
import { deleteById } from "../../models/song";

// Utils
import emojis from "../../../utils/emojis";

export default {
  name: "Song",
  props: ["song"],
  data: () => ({
    emojis,
    guestFullName: "",
    ref: this,
  }),
  computed: {
    marked() {
      return this.song.guestId !== "" && this.song.guestId !== "";
    },
    // Lang
    deleteConfirm() {
      return this.$root.$options.languages.lang.tablesPlanner.song
        .deleteConfirm[this.$root.$options.languages.current];
    },
    deleteConfirmYes() {
      return this.$root.$options.languages.lang.tablesPlanner.song
        .deleteConfirmYes[this.$root.$options.languages.current];
    },
    deleteSuccess() {
      return this.$root.$options.languages.lang.tablesPlanner.song
        .deleteSuccess[this.$root.$options.languages.current];
    },
  },
  methods: {
    async checkGuest() {
      try {
        if (this.marked) {
          const guest = await gogiw(this.song.guestId);

          if (guest) {
            this.guestFullName = guest.fullName;
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
    async delete() {
      try {
        await deleteById(this.song._id);
        this.$emit("deletedSong", this.song._id);

        // Message
        this.$message.success(this.deleteSuccess, 5);
      } catch (error) {
        console.error(error);

        // Message
        this.$message.warning(
          this.$root.$options.languages.lang.common.failMessage[
            this.$root.$options.languages.current
          ],
          5
        );
      }
    },
    onDeleteConfirm(ref) {
      this.$confirm({
        title: this.deleteConfirm,
        content: ref.song.title,
        okText: this.deleteConfirmYes,
        okType: "danger",
        cancelText: "No",
        onOk() {
          ref.delete();
        },
      });
    },
    onUpdate() {
      this.$emit("updateSong", this.song);
    },
  },
  watch: {
    song() {
      this.checkGuest();
    },
  },
  beforeMount() {
    this.checkGuest();
  },
};
</script>

<style scoped>
.song-item__global:not(:hover) {
  color: #db8979;
}
</style>
