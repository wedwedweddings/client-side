<template>
  <div>
    <a-modal
      :confirmLoading="confirmLoading"
      :footer="null"
      :title="title"
      :visible="formType !== ''"
      @cancel="handleCancel"
    >
      <!-- Guest -->
      <GuestForm
        v-if="formType === 'guest'"
        :guestToUpdate="guestToUpdate"
        @updatedGuest="onUpdatedGuest"
      />

      <!-- Present -->
      <PresentForm
        v-if="formType === 'present'"
        :presentToUpdate="presentToUpdate"
        @updatedPresent="onUpdatedPresent"
      />

      <!-- Song -->
      <SongForm
        v-if="formType === 'song'"
        :songToUpdate="songToUpdate"
        @updatedPresent="onUpdatedPresent"
      />
    </a-modal>
  </div>
</template>

<script>
// Layouts
import GuestForm from "../GuestForm/GuestForm";
import PresentForm from "../PresentForm/PresentForm";
import SongForm from "../SongForm/SongForm";

export default {
  name: "TablesPlannerModal",
  components: {
    GuestForm,
    PresentForm,
    SongForm,
  },
  props: ["formType", "guestToUpdate", "presentToUpdate", "songToUpdate"],
  data: () => ({
    confirmLoading: false,
  }),
  computed: {
    // Lang
    title() {
      const hasGuest =
        this.guestToUpdate && Object.keys(this.guestToUpdate).length > 0;

      switch (this.formType) {
        case "guest":
          return hasGuest && this.guestToUpdate.accompanying !== "main-guest"
            ? this.$root.$options.languages.lang.gettingStarted.companionsForm
                .title[this.$root.$options.languages.current]
            : this.$root.$options.languages.lang.gettingStarted.guestsForm
                .title[this.$root.$options.languages.current];

        case "present":
          return this.$root.$options.languages.lang.gettingStarted.presentsForm
            .title[this.$root.$options.languages.current];

        case "song":
          return this.$root.$options.languages.lang.tablesPlanner.songsForm
            .title[this.$root.$options.languages.current];

        default:
          return "";
      }
    },
  },
  methods: {
    handleCancel() {
      this.$emit("closeModal");
    },
    // Guests
    onUpdatedGuest() {
      this.$emit("updatedGuest");
    },
    // Present
    onUpdatedPresent() {
      this.$emit("updatedPresent");
    },
    // Present
    onUpdatedSong() {
      this.$emit("updatedSong");
    },
  },
  beforeUpdate() {
    console.log("form type:", this.formType);
  },
};
</script>
