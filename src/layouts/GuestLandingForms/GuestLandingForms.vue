<template>
  <a-form-model class="weddings_form" :model="model">
    <!-- Main Guest -->
    <MainGuestForm v-model="model.mainGuest" />

    <a-divider class="weddings_divider" />

    <!-- Companion(s) -->
    <a-card class="weddings_card" :title="companionsTitle">
      <CompanionForm
        v-for="(item, index) in companionsLength"
        v-model="model.companions[index]"
        :key="index"
        :index="index"
        @remove="deleteCompanion"
      />

      <a-divider />

      <a-button style="float: right;" size="small" @click="addCompanionBlock('plus')">
        {{ addCompanion}}
        <a-icon type="user-add" />
      </a-button>
    </a-card>

    <a-divider class="weddings_divider" />

    <!-- Update Guest -->
    <a-form-model-item class="weddings_form-item" style="text-align:center;">
      <a-button class="button" type="primary" html-type="submit" @click="onUpdateInvitation">
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
  guestUpdatesOwnDataById as guodbi,
  guestGetsCompanionsById as ggcbi,
  guestUpdatesCompanion as guc,
  guestDeletesCompanion as gdc,
} from "../../models/companion";

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
    previous: [],
    song: {},
  }),
  computed: {
    companionsLength() {
      return this.model.companions.length;
    },
    // Lang
    companionsTitle() {
      return this.$root.$options.languages.lang.guestLanding.companionsTitle[
        this.$root.$options.languages.current
      ];
    },
    fullNamePlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .placeholders.fullName[this.$root.$options.languages.current];
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
    // Init
    async init() {
      // Decoding token
      const token = this.$route.params.token;
      const decoded = jwt.verify(token);

      // Setting up Guest data
      this.model.mainGuest = await ggodbi(decoded.id);

      // Setting up Companion(s) data
      this.model.companions = await ggcbi(this.model.mainGuest._id);

      this.previous = [];
      this.model.companions.forEach((item) => {
        this.previous.push({
          fullName: item.fullName,
          menu: item.menu,
        });
      });
    },
    // Main Guest
    async updateMainGuest() {
      await guodbi(this.model.mainGuest._id, this.model.mainGuest);
    },
    // Companions
    checkCompanionBeforeUpdate(c, p) {
      return (
        c.fullName.length > 1 &&
        this.fullNamePlaceholder.indexOf(c.fullName) === -1 &&
        (c.fullName !== p.fullName ||
          c.menu !== p.menu ||
          this.model.mainGuest.assistance !== c.assistance)
      );
    },
    checkCompanionBeforeDelete(c) {
      return (
        c.fullName.length <= 1 ||
        this.fullNamePlaceholder.indexOf(c.fullName) !== -1
      );
    },
    updateCompanions() {
      const promises = [];

      this.model.companions.forEach((item, i) => {
        if (
          this.checkCompanionBeforeUpdate(
            this.model.companions[i],
            this.previous[i]
          )
        ) {
          promises.push(
            guc(
              this.model.mainGuest._id,
              this.previous[i],
              this.model.companions[i],
              this.model.mainGuest
            )
          );
        }
      });

      if (promises.length === 0) return;

      Promise.all(promises)
        .then(() => {
          console.log("Companions updated!");
        })
        .catch((reason) => {
          console.log(reason);
        });
    },
    async deleteCompanion(index) {
      if (!this.deleteCompanionBlock(index)) {
        await gdc(this.model.mainGuest._id, this.previous[index]);
        await this.init();
      }
    },
    addCompanionBlock() {
      if (this.companionsLength < 12) {
        this.model.companions.push({
          fullName: this.fullNamePlaceholder,
          menu: "standard",
        });
        this.previous.push({ fullName: "temp", menu: "standard" });
      }
    },

    deleteCompanionBlock(index) {
      if (this.checkCompanionBeforeDelete(this.model.companions[index])) {
        this.model.companions.splice(index, 1);
        this.previous.splice(index, 1);
        return true;
      }

      return false;
    },
    // Submit form
    async onUpdateInvitation() {
      // TODO: Validate form...

      await this.updateMainGuest();

      await this.updateCompanions();

      this.init();
    },
  },
  created() {
    this.init();
  },
};
</script>
