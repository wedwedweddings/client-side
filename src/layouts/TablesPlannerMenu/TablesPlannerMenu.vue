<template>
  <div>
    <!-- CateringCalculator -->
    <CateringCalculator :content="guests" />

    <br />

    <!-- Guests List -->
    <MenuGuestList
      :content="guests"
      :filters="filters"
      @deletedGuest="onDeletedGuest"
      @filterByTag="onFilterByTag"
      @guestModal="onGuestModal"
      @updateGuest="onUpdateGuest"
    />

    <br />

    <!-- Presents List -->
    <MenuPresentList
      :content="presents"
      @deletedPresent="onDeletedPresent"
      @presentModal="onPresentModal"
      @updatePresent="onUpdatePresent"
    />
  </div>
</template>

<script>
// Layouts
import CateringCalculator from "../../layouts/CateringCalculator/CateringCalculator";
import MenuGuestList from "../../layouts/MenuGuestList/MenuGuestList";
import MenuPresentList from "../../layouts/MenuPresentList/MenuPresentList";

// Utils
import colors from "../../../utils/colors";
import emojis from "../../../utils/emojis";

export default {
  name: "TablesPlannerMenu",
  components: {
    CateringCalculator,
    MenuGuestList,
    MenuPresentList
  },
  props: ["filters", "guests", "presents"],
  data: () => ({
    colors,
    emojis
  }),
  methods: {
    // Guest
    onDeletedGuest(guestId) {
      this.$emit("deletedGuest", guestId);
    },
    onFilterByTag(tagId) {
      this.$emit("filterByTag", tagId);
    },
    onGuestModal() {
      this.$emit("guestModal");
    },
    onUpdateGuest(guest) {
      this.$emit("updateGuest", guest);
    },
    // Present
    onDeletedPresent(presentId) {
      this.$emit("deletedPresent", presentId);
    },
    onPresentModal() {
      this.$emit("presentModal");
    },
    onUpdatePresent(present) {
      this.$emit("updatePresent", present);
    }
  }
};
</script>

<style scoped>
.tables-planner-menu__divider {
  color: #e1e9f2;
}

.tables-planner-menu__span {
  color: #e1e9f2;
  margin-right: 8px;
}

.tables-planner-menu__span-current-table {
  border: 1px solid #e1e9f2;
  border-radius: 2px;
  color: #e1e9f2;
  font-weight: bold;
  padding: 0 4px;
}
</style>
