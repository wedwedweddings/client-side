<template>
  <a-form class="weddings_form" :form="form" @submit="onSubmit">
    <!-- Main Guest -->
    <a-card class="weddings_card" :title="mainGuestTitle">
      <MainGuestForm :mainGuest="updated.mainGuest" @change="onChangeMainGuest" />
    </a-card>

    <a-divider class="weddings_divider" />

    <!-- Companion(s) -->
    <a-card class="weddings_card" :title="companionsTitle">
      <CompanionForm
        v-for="(item, index) in companionBlocks"
        :companions="original.companions[index]"
        :key="index"
        :index="index"
        @change="onChangeCompanion"
        @remove="deleteCompanion"
      />

      <a-divider />

      <a-button style="float: right;" size="small" @click="companionBlocksHandler('plus')">
        {{ addCompanion}}
        <a-icon type="user-add" />
      </a-button>
    </a-card>

    <a-divider class="weddings_divider" />

    <!-- Song -->
    <a-card class="weddings_card" :title="songHeading">
      <SongForm :song="updated.song" @change="onChangeSong" />
    </a-card>

    <a-divider class="weddings_divider" />

    <!-- Update -->
    <a-form-item class="weddings_form-item" style="text-align:center;">
      <a-button class="button" type="primary" html-type="submit">
        {{ updateInfo}}
        <a-icon type="sync" />
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// Modules
import jwt from "jsonwebtoken";

// Components
import CompanionForm from "../../components/GuestLanding/CompanionForm";
import MainGuestForm from "../../components/GuestLanding/MainGuestForm";
import SongForm from "../../components/GuestLanding/SongForm";

// Models
import { getCaptchaToken, postTokenToVerify } from "../../models/grecaptcha";
import {
  guestGetsOwnDataById as ggodbi,
  guestUpdatesOwnDataById as guodbi,
  guestGetsCompanionsById as ggcbgi,
  guestUpdatesCompanion as gucbgi,
  guestDeletesCompanion as gdcbgi,
} from "../../models/companion";
import {
  guestGetsSong as ggsbgi,
  guestUpdatesSong as gusbgi,
  //guestDeletesSong as gdsbgi,
} from "../../models/song";

export default {
  name: "GuestLandingCol1",
  components: {
    CompanionForm,
    MainGuestForm,
    SongForm,
  },
  data: () => ({
    companionBlocks: 1,
    original: {
      mainGuest: {},
      companions: [],
      song: {},
    },
    updated: {
      mainGuest: {},
      companions: [],
      song: {},
    },
    update: {
      mainGuest: false,
      companions: false,
      song: false,
    },
  }),
  computed: {
    // Lang
    mainGuestTitle() {
      return this.$root.$options.languages.lang.guestLanding.mainGuestTitle[
        this.$root.$options.languages.current
      ];
    },
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
    songHeading() {
      return this.$root.$options.languages.lang.guestLanding.songHeading[
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
      return this.$root.$options.languages.lang.guestLanding.updateSuccess[
        this.$root.$options.languages.current
      ];
    },
  },
  methods: {
    // Init
    async init() {
      // No updates until something changes
      this.update.mainGuest = false;
      this.update.companions = false;
      this.update.song = false;

      // Decoding token
      const token = this.$route.params.token;
      const decoded = jwt.verify(token, "WED_WED_WEDDINGS");

      // #️⃣ Setting up Guest data
      try {
        this.original.mainGuest = this.updated.mainGuest = await ggodbi(
          decoded.id
        );
      } catch (erorr) {
        console.error();
      }

      // #️⃣ Setting up Companion(s) data
      try {
        this.original.companions = await ggcbgi(this.original.mainGuest._id);
      } catch (error) {
        console.error();
      }

      // #️⃣ Setting up Song data
      try {
        this.original.song = await ggsbgi(this.original.mainGuest._id);
      } catch (error) {
        console.error();
      }

      // #️⃣ Set init values in form
      this.companionBlocks =
        this.original.companions.length > 0
          ? this.original.companions.length
          : 1;
    },
    initForm() {
      const mainGuestAndSong = {
        mainGuestFullName: this.original.mainGuest.fullName,
        mainGuestMenu: this.original.mainGuest.menu,
        mainGuestAssistance: this.original.mainGuest.assistance,
        songArtist: this.original.song.artist,
        songTitle: this.original.song.title,
        songURL: this.original.song.url,
      };

      const companions = {};

      this.original.companions.forEach((c, i) => {
        companions[`companion${i}FullName`] = c.fullName;
        companions[`companion${i}Menu`] = c.menu;
      });

      const values = { ...mainGuestAndSong, ...companions };

      this.form.setFieldsValue(values);
    },
    // Main Guest
    onChangeMainGuest(mainGuest) {
      this.update.mainGuest = true;

      this.updated.mainGuest = { ...this.original.mainGuest, ...mainGuest };
    },
    // Companions
    companionBlocksHandler(mod) {
      this.companionBlocks =
        mod === "plus" ? this.companionBlocks + 1 : this.companionBlocks - 1;
    },
    onChangeCompanion(obj) {
      this.update.companions = true;

      const companion = this.original.companions[obj.index]
        ? { ...this.original.companions[obj.index], ...obj.companion }
        : obj.companion;

      this.updated.companions[obj.index] = companion;
    },
    updateCompanions() {
      const promises = [];

      this.updated.companions.forEach((c, i) => {
        if (c !== undefined) {
          const companion = this.original.companions[i]
            ? this.original.companions[i]
            : this.updated.companions[i];

          promises.push(
            gucbgi(
              this.updated.mainGuest,
              companion,
              this.updated.companions[i]
            )
          );
        }
      });

      if (promises.length === 0) return;

      // Go promises!
      Promise.all(promises)
        .then(() => {
          console.log("Companions updated!");
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
    async deleteCompanion(index) {
      if (
        this.original.companions[index] !== undefined &&
        this.original.companions[index]._id.length > 0
      ) {
        await gdcbgi(
          this.original.mainGuest._id,
          this.original.mainGuest.weddingId,
          this.original.companions[index]
        );

        this.original.companions = [];

        this.$message.success(this.updateSuccess, 5);

        await this.init();
        await this.initForm();
      }
    },
    //  Song
    onChangeSong(song) {
      this.update.song = true;

      const s = this.original.song ? { ...this.original.song, ...song } : song;

      this.updated.song = s;
    },
    // Submit form
    onSubmit(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          this.onUpdateInvitation(values);
        }
      });
    },
    async onUpdateInvitation() {
      let token;
      let confirm = false;

      try {
        token = await getCaptchaToken();
      } catch (error) {
        console.error(error);
      }

      if (!token) return;

      try {
        const response = await postTokenToVerify(token);
        confirm = response.success;
      } catch (error) {
        console.error(error);
      }

      if (!confirm) return;

      // Updating main guest
      if (this.update.mainGuest) {
        try {
          await guodbi(this.original.mainGuest._id, this.updated.mainGuest);
        } catch (error) {
          console.error(error);

          // Message
          this.$message.warning(
            this.$root.$options.languages.lang.common.failMessage[
              this.$root.$options.languages.current
            ],
            5
          );
        }
      }

      // Updating companions
      if (this.update.mainGuest || this.update.companions) {
        try {
          await this.updateCompanions();
        } catch (error) {
          console.error(error);

          // Message
          this.$message.warning(
            this.$root.$options.languages.lang.common.failMessage[
              this.$root.$options.languages.current
            ],
            5
          );
        }
      }

      // Updating song
      if (this.update.song) {
        try {
          await gusbgi(this.updated.mainGuest, this.updated.song);
        } catch (error) {
          console.error(error);

          // Message
          this.$message.warning(
            this.$root.$options.languages.lang.common.failMessage[
              this.$root.$options.languages.current
            ],
            5
          );
        }
      }

      // Message
      if (this.update.mainGuest || this.update.companions || this.update.song) {
        this.$message.success(this.updateSuccess, 5);
        await this.init();
        await this.initForm();
      }
    },
  },
  created() {
    this.form = this.$form.createForm(this, { name: "guestLanding" });
  },
  async beforeMount() {
    await this.init();
    await this.initForm();
  },
};
</script>
