<template>
  <a-list-item-meta :description="getGuestDescription(guest)">
    <a-badge style="margin-right:8px;" :status="badgeColor(guest.assistance)" slot="title">
      <a-avatar size="small">{{ guest.relative === 1 ? "1" : guest.relative === 2 ? "2" : "1·2" }}</a-avatar>
    </a-badge>

    <span slot="title" style="cursor:pointer;" @click="onUpdate">{{ guest.fullName }}</span>

    <span slot="title" style="margin-left:8px;" v-if="guest.seat.length > 0">{{ emojis.checked }}</span>

    <a-icon
      slot="title"
      style="float:right; margin-top:4px;"
      type="delete"
      @click="onDeleteConfirm(ref)"
    />
  </a-list-item-meta>
</template>

<script>
// Controllers
import { getDescription as ggd, getMenu as ggm } from "../../controllers/guest";

// Models
import { deleteById as dgbi } from "../../models/guest";
import {
  getAllInWeddingByGuestId as gapiwbgi,
  updateById as upbi,
} from "../../models/present";
import {
  getByGuestId as gsbgi,
  deleteByGuestId as dsbgi,
} from "../../models/song";

// Utils
import emojis from "../../../utils/emojis";

export default {
  name: "GuestListItem",
  props: ["guest"],
  data: () => ({
    emojis,
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
    removePresentOwner() {
      return this.$root.$options.languages.lang.tablesPlanner.menu
        .removePresentOwner[this.$root.$options.languages.current];
    },
  },
  methods: {
    badgeColor(assistance) {
      let color = "success";

      switch (assistance) {
        case "yes":
          color = "success";
          break;
        case "no":
          color = "error";
          break;
        case "pending":
          color = "warning";
          break;
      }

      return color;
    },
    async delete() {
      // Remove Guest
      try {
        await dgbi(this.guest._id);
        this.$emit("deletedGuest", this.guest._id);

        // Message
        this.$message.success(this.deleteSuccess, 5);
      } catch (error) {
        // Message
        this.$message.warning(
          this.$root.$options.languages.lang.common.failMessage[
            this.$root.$options.languages.current
          ],
          5
        );
      }

      // Modify related items
      try {
        this.modifyRelatedItems();
      } catch (error) {
        // Message
        this.$message.warning(
          this.$root.$options.languages.lang.common.failMessage[
            this.$root.$options.languages.current
          ],
          5
        );
      }
    },
    async modifyRelatedItems() {
      const promises = [];

      let presents = [];
      let song;

      // Check if Guest has assigned present
      try {
        presents = await gapiwbgi(this.guest._id);
      } catch (error) {
        console.error(error);
      }

      if (presents.length > 0) {
        presents.forEach((p) => {
          promises.push(upbi(p._id, { guestId: "" }));
        });
      }

      // Check if Guest has assigned song
      try {
        song = await gsbgi(this.guest._id);
      } catch (error) {
        console.error(error);
      }

      if (song) {
        promises.push(dsbgi(this.guest._id));
      }

      if (promises.length === 0) return;

      // Go promises!
      Promise.all(promises)
        .then(() => {
          // Message
          if (presents.length > 0) {
            this.$message.success(this.removePresentOwner, 5);
          }
        })
        .catch((reason) => {
          console.error(reason);

          // Message
          this.$message.warning(
            this.$root.$options.languages.lang.common.failMessage[
              this.$root.$options.languages.current
            ],
            5
          );
        });
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
    onUpdate() {
      this.$emit("updateGuest", this.guest);
    },
    // Guest Controller
    getGuestDescription(guest) {
      if (guest) {
        return ggd(guest, [this.$root.$options.languages.current]);
      }

      return "";
    },
    getGuestMenu(menu) {
      if (menu) {
        return ggm(menu);
      }

      return "";
    },
  },
  beforeMount() {
    this.ref = this;
  },
};
</script>
