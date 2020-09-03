<template>
  <a-popover trigger="click">
    <!-- Guest Name -->
    <span slot="title">{{ guest.fullName }}</span>

    <!-- Delete Guest -->
    <a-icon
      style="margin-left:8px;"
      slot="title"
      type="minus-circle"
      @click="onDeleteConfirm(ref)"
    />

    <!-- Description -->
    <template slot="content">
      <p>{{ getGuestDescription(guest) }}</p>
    </template>

    <!-- Avatar -->
    <a-badge style="margin-right:8px;" :status="badgeColor(guest.assistance)">
      <a-avatar :style="avatarStyle()" size="small">{{ avatarLetters(guest.fullName) }}</a-avatar>
    </a-badge>
  </a-popover>
</template>

<script>
// Controllers
import { getDescription as ggd } from "../../controllers/guest";

// Models
import { deleteById } from "../../models/guest";

// Utils
import colors from "../../../utils/colors";
import emojis from "../../../utils/emojis";
import menus from "../../../utils/menus";

export default {
  name: "GuestAvatar",
  props: ["guest"],
  data: () => ({
    emojis,
    menus,
    ref: this,
  }),
  computed: {
    // Lang
    deleteConfirm() {
      return this.$root.$options.languages.lang.gettingStarted.guest
        .deleteConfirm[this.$root.$options.languages.current];
    },
    deleteConfirmYes() {
      return this.$root.$options.languages.lang.gettingStarted.guest
        .deleteConfirmYes[this.$root.$options.languages.current];
    },
    deleteSuccess() {
      return this.$root.$options.languages.lang.gettingStarted.guest
        .deleteSuccess[this.$root.$options.languages.current];
    },
  },
  methods: {
    avatarLetters(name) {
      return name
        .split(" ")
        .map((n) => {
          return n.split("")[0];
        })
        .join("")
        .toUpperCase();
    },
    avatarStyle() {
      return `background:${colors.terracotta.hex}; color:${colors.parchment.hex}; cursor:pointer; fontSize:10px; fontWeight:bold;`;
    },
    badgeColor(assistance) {
      if (assistance === "yes") {
        return "success";
      } else if (assistance === "no") {
        return "error";
      }

      return "warning";
    },
    async delete() {
      try {
        await deleteById(this.guest._id);
        this.$emit("deletedGuest", this.guest._id);

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
        content: ref.guest.fullName,
        okText: this.deleteConfirmYes,
        okType: "danger",
        cancelText: "No",
        onOk() {
          ref.delete();
        },
      });
    },
    // Guest Controller
    getGuestDescription(guest) {
      if (guest) {
        return ggd(guest, [this.$root.$options.languages.current]);
      }

      return "";
    },
  },
  beforeMount() {
    this.ref = this;
  },
};
</script>