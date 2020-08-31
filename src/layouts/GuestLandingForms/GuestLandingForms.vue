<template>
  <a-form-model :model="model">
    <!-- Main Guest -->
    <MainGuestForm v-model="model.mainGuest" />

    <a-divider />

    <!-- Companion(s) -->
    <a-card :title="companionsTitle">
      <CompanionForm
        v-for="(item, index) in totalCompanionBlocks"
        v-model="model.companions[index]"
        :key="index"
        :index="index"
      />

      <a-divider />

      <a-button style="float: right;" size="small" @click="setTotalCompanionBlocks('plus')">
        {{ addCompanion}}
        <a-icon type="user-add" />
      </a-button>
    </a-card>

    <a-divider />

    <!-- Update Guest -->
    <a-form-model-item class="guest-landing-form__item" style="text-align:center;">
      <a-button type="primary" html-type="submit" @click="onUpdateInvitation">
        {{ updateInfo}}
        <a-icon type="sync" />
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
// Modules
import jwt from "jsonwebtoken";

// Components
import CompanionForm from "../../components/GuestLanding/CompanionForm";
import MainGuestForm from "../../components/GuestLanding/MainGuestForm";

// Models
import {
  guestGetsOwnDataById as ggodbi,
  guestGetsCompanionsById as ggcbi,
  guestUpdatesOwnDataById as guodbi,
} from "../../models/guest";

export default {
  name: "GuestLandingForm",
  components: {
    CompanionForm,
    MainGuestForm,
  },
  data: () => ({
    model: {
      mainGuest: {},
      companions: [],
    },
    totalCompanionBlocks: 1,
    song: {},
  }),
  computed: {
    // Lang
    companionsTitle() {
      return this.$root.$options.languages.lang.guestLanding.companionsTitle[
        this.$root.$options.languages.current
      ];
    },
    addCompanion() {
      return this.$root.$options.languages.lang.guestLanding.addCompanion[
        this.$root.$options.languages.current
      ];
    },
    updateInfo() {
      return this.$root.$options.languages.lang.guestLanding.updateInfo[
        this.$root.$options.languages.current
      ];
    },
    addSuccess() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .addSuccess[this.$root.$options.languages.current];
    },
    updateSuccess() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .updateSuccess[this.$root.$options.languages.current];
    },
  },
  methods: {
    async updateMainGuest() {
      const updated = await guodbi(
        this.model.mainGuest._id,
        this.model.mainGuest
      );

      console.log("Updated:", updated);
    },
    // Companions
    setTotalCompanionBlocks(param) {
      if (
        param === "delete" &&
        this.totalCompanionBlocks > this.model.companions.length
      ) {
        this.totalCompanionBlocks--;
        this.model.companions.pop();
      } else if (param === "plus" && this.totalCompanionBlocks < 12) {
        this.totalCompanionBlocks++;
        this.model.companions.push({ fullName: "", menu: "standard" });
      }
    },
    // Submit form
    onUpdateInvitation() {
      // TODO: Validate form...
      this.updateMainGuest();
    },
  },
  async created() {
    // Setting up Guest data
    const token = this.$route.params.token;
    const decoded = jwt.verify(token, process.env.VUE_APP_JWT_SECRET);

    this.model.mainGuest = await ggodbi(decoded.id);

    // Setting up Companion(s) data
    this.model.companions = await ggcbi(this.model.mainGuest._id);
    this.totalCompanionBlocks = this.model.companions.length;
  },
};
</script>

<style scoped>
.divider {
  margin: 32px 0 8px 0;
}

.guest-landing-form__item {
  margin-bottom: 8px;
}
</style>
