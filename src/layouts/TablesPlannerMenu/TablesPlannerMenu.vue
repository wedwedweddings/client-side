<template>
  <div class="tables-planner-menu_container">
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
    MenuPresentList,
  },
  props: ["filters", "guests", "presents"],
  data: () => ({
    colors,
    emojis,
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
    },
  },
};
</script>
