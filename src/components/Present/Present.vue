<template>
  <a-list-item-meta>
    <a :href="present ? present.url : '#'" slot="title" target="_blank">
      <a-icon class="present-item__shop" type="shop" style="margin-right:8px;" />
    </a>

    <span slot="title" style="cursor:pointer;" @click="onUpdate">{{ present ? present.title : '' }}</span>

    <a-tooltip placement="right" slot="title" :title="guestFullName" v-if="marked && showRubbish">
      <span style="margin-left:8px;">{{ emojis.checked }}</span>
    </a-tooltip>

    <a-icon
      v-if="showRubbish"
      slot="title"
      type="delete"
      style="float:right; margin-top:4px;"
      @click="onDeleteConfirm(ref)"
    />

    <a-checkbox v-else class="present_checkbox" slot="title" @click="onPresentClick" />
  </a-list-item-meta>
</template>

<script>
// Models
import { getOneInWedding as gogiw } from "../../models/guest";
import { deleteById } from "../../models/present";

// Utils
import emojis from "../../../utils/emojis";

export default {
  name: "Present",
  props: ["present"],
  data: () => ({
    emojis,
    guestFullName: "",
    ref: this,
  }),
  computed: {
    marked() {
      return this.present.guestId !== "";
    },
    showRubbish() {
      return !this.$route.params.token;
    },
    // Lang
    deleteConfirm() {
      return this.$root.$options.languages.lang.gettingStarted.present
        .deleteConfirm[this.$root.$options.languages.current];
    },
    deleteConfirmYes() {
      return this.$root.$options.languages.lang.gettingStarted.present
        .deleteConfirmYes[this.$root.$options.languages.current];
    },
    deleteSuccess() {
      return this.$root.$options.languages.lang.gettingStarted.present
        .deleteSuccess[this.$root.$options.languages.current];
    },
  },
  methods: {
    async checkGuest() {
      try {
        if (this.marked) {
          const guest = await gogiw(this.present.guestId);

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
        await deleteById(this.present._id);
        this.$emit("deletedPresent", this.present._id);

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
        content: ref.present.title,
        okText: this.deleteConfirmYes,
        okType: "danger",
        cancelText: "No",
        onOk() {
          ref.delete();
        },
      });
    },
    onUpdate() {
      this.$emit("updatePresent", this.present);
    },
    onPresentClick() {
      this.$emit("selectPresent", this.present);
    },
  },
  watch: {
    present() {
      this.checkGuest();
    },
  },
  beforeMount() {
    this.checkGuest();
  },
};
</script>

<style scoped>
.present-item__shop:not(:hover) {
  color: #db8979;
}
</style>
