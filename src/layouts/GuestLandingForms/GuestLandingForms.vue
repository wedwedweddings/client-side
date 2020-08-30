<template>
  <a-form :form="form" @submit="onUpdateInvitation">
    <!-- Main Guest -->
    <MainGuestForm v-model="mainGuest" />

    <a-divider />

    <!-- Companion(s) -->
    <a-card :title="companionsTitle">
      <CompanionForm v-for="i in totalCompanionBlocks" :key="i" v-model="companions[i]" />

      <a-divider />

      <a-button @click="setTotalCompanionBlocks('plus')">
        {{ addCompanion}}
        <a-icon type="user-add" />
      </a-button>

      <a-button @click="setTotalCompanionBlocks('delete')">
        {{ deleteCompanion}}
        <a-icon type="user-delete" />
      </a-button>
    </a-card>

    <a-divider />

    <!-- Update Guest -->
    <a-form-item class="guest-landing-form__item" style="text-align:center;">
      <a-button type="primary" html-type="submit">
        {{ updateInfo}}
        <a-icon type="sync" />
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// https://www.digitalocean.com/community/tutorials/vuejs-add-v-model-support

// Modules
import jwt from "jsonwebtoken";

// Components
import CompanionForm from "../../components/GuestLanding/CompanionForm";
import MainGuestForm from "../../components/GuestLanding/MainGuestForm";

// Models
//import { add, updateById } from "../../models/guest";
//import { getLast } from "../../models/wedding";

export default {
  name: "GuestLandingForm",
  components: {
    CompanionForm,
    MainGuestForm,
  },
  data: () => ({
    mainGuest: {},
    companions: [],
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
    deleteCompanion() {
      return this.$root.$options.languages.lang.guestLanding.deleteCompanion[
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
    // Companions
    setTotalCompanionBlocks(param) {
      if (
        param === "delete" &&
        this.totalCompanionBlocks > this.companions.length
      ) {
        this.totalCompanionBlocks--;
      } else if (param === "plus" && this.totalCompanionBlocks < 12) {
        this.totalCompanionBlocks++;
      }
    },
    // Submit form
    onUpdateInvitation(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // TODO: Dispatch queries to API

          console.log("values:", values);
        }
      });
    },
  },
  beforeCreate() {
    // Setting up this form
    this.form = this.$form.createForm(this, { name: "guest" });
  },
  created() {
    // Setting up Guest and Companion(s) data
    const token = this.$route.params.token;
    const decoded = jwt.verify(token, process.env.VUE_APP_JWT_SECRET);
    this.mainGuest = decoded;

    console.log("beforeCreate:", this.mainGuest);

    this.companions.push({
      fullName: "Lola",
      menu: "vegan",
    });
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
