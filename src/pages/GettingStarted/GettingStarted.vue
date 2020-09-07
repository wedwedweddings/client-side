<template>
  <div class="getting-started_container">
    <a-row type="flex" justify="center" align="middle">
      <!-- Steps -->
      <a-col class="getting-started_steps" :span="6">
        <GettingStartedSteps :currentStep="currentStep" />
      </a-col>

      <a-col class="getting-started_forms" :span="fullWidthForm ? 16 : 10">
        <!-- Register & Wedding -->
        <a-row type="flex" justify="center" align="middle" v-if="!fullWidthForm">
          <a-col :span="20">
            <a-card class="weddings_card" :title="currentTitle" :bordered="false">
              <!-- RegisterForm -->
              <RegisterForm v-if="currentStep === 0" @registered="onRegistered" />

              <!-- WeddingForm -->
              <WeddingForm v-if="currentStep === 1" @weddingCreated="onWedding" />
            </a-card>
          </a-col>
        </a-row>

        <!-- Guests -->
        <a-row type="flex" justify="space-between" v-if="fullWidthForm && currentStep === 2">
          <!-- Guest Avatars -->
          <a-col class="getting-started_guests" :span="6">
            <a-card class="weddings_card" :title="firstGroupTitle" :bordered="false">
              <GuestAvatar
                class="getting-started__guest-avatar"
                v-for="g in guests.one"
                :key="g._id"
                :guest="g"
                @deletedGuest="onUpdatedGuest"
              />
            </a-card>
          </a-col>

          <!-- GuestForm -->
          <a-col class="getting-started_forms" :span="10">
            <a-card class="weddings_card" :title="currentTitle" :bordered="false">
              <GuestForm @updatedGuest="onUpdatedGuest" @guestsAdded="onGuest" />
            </a-card>
          </a-col>

          <!-- Guest Avatars -->
          <a-col class="getting-started_guests" :span="6">
            <a-card class="weddings_card" :title="secondGroupTitle" :bordered="false">
              <GuestAvatar
                class="getting-started__guest-avatar"
                v-for="g in guests.two"
                :key="g._id"
                :guest="g"
                @deletedGuest="onUpdatedGuest"
              />
            </a-card>
          </a-col>
        </a-row>

        <!-- Presents -->
        <a-row type="flex" justify="space-around" v-if="fullWidthForm && currentStep === 3">
          <!-- PresentForm -->
          <a-col class="getting-started_forms" :span="14">
            <a-card class="weddings_card" :title="currentTitle" :bordered="false">
              <PresentForm @updatedPresent="onUpdatedPresent" @presentsAdded="onPresent" />
            </a-card>
          </a-col>

          <!-- Presents List -->
          <a-col class="getting-started_presents" :span="8">
            <a-card class="weddings_card" :bordered="false">
              <a-list size="small" :dataSource="presents">
                <a-list-item slot="renderItem" slot-scope="item">
                  <Present :present="item" @deletedPresent="onUpdatedPresent" />
                </a-list-item>
              </a-list>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// Components
import GettingStartedSteps from "../../components/GettingStartedSteps/GettingStartedSteps";
import GuestAvatar from "../../components/GuestAvatar/GuestAvatar";
import Present from "../../components/Present/Present";

// Layouts
import GuestForm from "../../layouts/GuestForm/GuestForm";
import PresentForm from "../../layouts/PresentForm/PresentForm";
import RegisterForm from "../../layouts/RegisterForm/RegisterForm";
import WeddingForm from "../../layouts/WeddingForm/WeddingForm";

// Models
import { getAllInWedding as gagiw } from "../../models/guest";
import { getAllInWedding as gapiw } from "../../models/present";

export default {
  name: "GettingStarted",
  components: {
    GettingStartedSteps,
    GuestAvatar,
    GuestForm,
    Present,
    PresentForm,
    RegisterForm,
    WeddingForm,
  },
  data: () => ({
    currentStep: 0,
    guests: {
      one: [],
      two: [],
    },
    presents: [],
    spouses: {
      one: {
        fullName: "Cónyuge 1",
      },
      two: {
        fullName: "Cónyuge 2",
      },
    },
  }),
  computed: {
    fullWidthForm() {
      return this.currentStep === 2 || this.currentStep === 3;
    },
    firstGroupTitle() {
      return (
        "👯‍♀️👯‍♂️ " +
        (this.spouses.one.emoji
          ? this.spouses.one.emoji + " " + this.spouses.one.fullName
          : this.spouses.one.fullName)
      );
    },
    secondGroupTitle() {
      return (
        "👯‍♂️👯‍♀️ " +
        (this.spouses.two.emoji
          ? this.spouses.two.emoji + " " + this.spouses.two.fullName
          : this.spouses.two.fullName)
      );
    },
    // Lang
    metaTitle() {
      switch (this.currentStep) {
        case 0:
          return this.$root.$options.languages.lang.gettingStarted.registerForm
            .meta.title[this.$root.$options.languages.current];
        case 1:
          return this.$root.$options.languages.lang.gettingStarted.weddingForm
            .meta.title[this.$root.$options.languages.current];
        case 2:
          return this.$root.$options.languages.lang.gettingStarted.guestsForm
            .meta.title[this.$root.$options.languages.current];
        case 3:
          return this.$root.$options.languages.lang.gettingStarted.presentsForm
            .meta.title[this.$root.$options.languages.current];
        default:
          return this.$root.$options.languages.current === "es"
            ? "Primeros pasos"
            : "Getting started";
      }
    },
    currentTitle() {
      switch (this.currentStep) {
        case 0:
          return this.$root.$options.languages.lang.gettingStarted.registerForm
            .title[this.$root.$options.languages.current];
        case 1:
          return this.$root.$options.languages.lang.gettingStarted.weddingForm
            .title[this.$root.$options.languages.current];
        case 2:
          return this.$root.$options.languages.lang.gettingStarted.guestsForm
            .title[this.$root.$options.languages.current];
        case 3:
          return this.$root.$options.languages.lang.gettingStarted.presentsForm
            .title[this.$root.$options.languages.current];
        default:
          return this.$root.$options.languages.current === "es"
            ? "Primeros pasos"
            : "Getting Started";
      }
    },
  },
  methods: {
    async init() {
      // Getting spouses from local storage
      if (localStorage.spouses) {
        this.spouses = JSON.parse(localStorage.spouses);
      }

      // Load Guests
      if (this.currentStep === 2) {
        try {
          const guests = await gagiw();

          this.guests.one = guests.filter((g) => {
            return g.relative === 1 || g.relative === 0;
          });

          this.guests.two = guests.filter((g) => {
            return g.relative === 2 || g.relative === 0;
          });
        } catch (error) {
          console.error("Error: Load Guests", error);
        }
      }

      // Load Presents
      if (this.currentStep === 3) {
        try {
          this.presents = await gapiw();
        } catch (error) {
          console.error("Error: Load Presents", error);
        }
      }
    },
    // Step > Register
    onRegistered() {
      localStorage.currentStep = this.currentStep = 1;
    },
    // Step > Wedding
    onWedding() {
      localStorage.currentStep = this.currentStep = 2;
    },
    // Step > Guest
    onGuest() {
      localStorage.currentStep = this.currentStep = 3;
    },
    async onUpdatedGuest() {
      // Getting spouses from local storage
      if (localStorage.spouses) {
        this.spouses = JSON.parse(localStorage.spouses);
      }

      // Load Guests
      try {
        const guests = await gagiw();

        this.guests.one = guests.filter((g) => {
          return g.relative === 1 || g.relative === 0;
        });

        this.guests.two = guests.filter((g) => {
          return g.relative === 2 || g.relative === 0;
        });
      } catch (error) {
        console.error("Error: Get all Guests in Wedding", error);
      }
    },
    // Step > Present
    async onUpdatedPresent() {
      try {
        this.presents = await gapiw();
      } catch (error) {
        console.error("Error: Get all Presents in Wedding", error);
      }
    },
    // Step > Start
    onPresent() {
      this.$router.push({ name: "tables-planner" });
    },
  },
  beforeMount() {
    // Setting up currentStep if any
    if (localStorage.currentStep) {
      const parsed = JSON.parse(localStorage.currentStep);

      if (parsed !== this.currentStep) {
        this.currentStep = parsed;
      }
    }

    // Init the app
    this.init();
  },
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.metaTitle,
      // all titles will be injected into this template
      titleTemplate: "%s | Wed Wed Weddings",
    };
  },
};
</script>
