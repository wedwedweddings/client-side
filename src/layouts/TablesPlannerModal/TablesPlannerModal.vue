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
    </a-modal>
  </div>
</template>

<script>
// Layouts
import GuestForm from "../GuestForm/GuestForm";
import PresentForm from "../PresentForm/PresentForm";

export default {
  name: "TablesPlannerModal",
  components: {
    GuestForm,
    PresentForm,
  },
  props: ["formType", "guestToUpdate", "presentToUpdate"],
  data: () => ({
    confirmLoading: false,
  }),
  computed: {
    // Lang
    title() {
      const hasGuest =
        this.guestToUpdate && Object.keys(this.guestToUpdate).length > 0;
      let type = "";

      if (this.formType) {
        if (
          this.formType === "guest" &&
          hasGuest &&
          this.guestToUpdate.accompanying !== "main-guest"
        ) {
          type = "companionsForm";
        } else {
          type = `${this.formType}sForm`;
        }
      }

      return this.formType
        ? this.$root.$options.languages.lang.gettingStarted[type].title[
            this.$root.$options.languages.current
          ]
        : "";
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
  },
};
</script>
