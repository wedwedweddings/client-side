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

// Utils
import { capitalize } from "../../../utils/utils";

export default {
  name: "TablesPlannerModal",
  components: {
    GuestForm,
    PresentForm
  },
  props: ["formType", "guestToUpdate", "presentToUpdate"],
  data: () => ({
    confirmLoading: false
  }),
  computed: {
    title() {
      return capitalize(this.formType);
    }
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
    }
  }
};
</script>
