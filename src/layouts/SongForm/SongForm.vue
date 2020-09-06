<template>
  <a-form class="weddings_form" :form="form" @submit="onSong">
    <!-- Suggested by -->
    <h4 v-if="selectedGuestFullName.length > 0">
      {{ suggestedBy}}
      <strong>{{selectedGuestFullName }}</strong>
    </h4>

    <!-- Title -->
    <a-form-item class="weddings_form-item">
      <a-input v-decorator="[
          'title',
        ]" :placeholder="titlePlaceholder">
        <a-icon slot="prefix" type="fire" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Artist -->
    <a-form-item class="weddings_form-item">
      <a-input
        v-decorator="[
          'artist',
        ]"
        :placeholder="artistPlaceholder"
        autofocus
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- URL -->
    <a-form-item class="weddings_form-item">
      <a-input v-decorator="[
          'url'
        ]" :placeholder="urlPlaceholder">
        <a-icon slot="prefix" type="global" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Add Song -->
    <a-form-item class="weddings_form-item" style="text-align:center;">
      <a-button type="primary" html-type="submit">
        {{ songButton }}
        <a-icon type="plus-circle" />
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// Models
import { getAllInWedding as gagiw } from "../../models/guest";
import { add, updateById } from "../../models/song";

// Utils
import { diffFields } from "../../../utils/utils";

export default {
  name: "SongForm",
  props: ["songToUpdate"],
  data: () => ({
    fetching: false,
    guests: [],
    selectedGuest: "",
  }),
  computed: {
    selectedGuestFullName() {
      if (this.guests.length > 0 && this.selectedGuest !== "") {
        const found = this.guests.find((g) => {
          return g._id === this.selectedGuest;
        });

        if (found) {
          return found.fullName;
        }

        return "";
      }

      return "";
    },
    hasSong() {
      return this.songToUpdate && Object.keys(this.songToUpdate).length > 0;
    },
    visible() {
      return this.$route.name === "getting-started";
    },
    // Lang
    suggestedBy() {
      return this.$root.$options.languages.lang.tablesPlanner.songsForm
        .suggestedBy[this.$root.$options.languages.current];
    },
    artistPlaceholder() {
      return this.$root.$options.languages.lang.tablesPlanner.songsForm
        .placeholders.artist[this.$root.$options.languages.current];
    },
    titlePlaceholder() {
      return this.$root.$options.languages.lang.tablesPlanner.songsForm
        .placeholders.title[this.$root.$options.languages.current];
    },
    urlPlaceholder() {
      return this.$root.$options.languages.lang.tablesPlanner.songsForm
        .placeholders.url[this.$root.$options.languages.current];
    },
    songButton() {
      if (this.hasSong) {
        return this.$root.$options.languages.lang.tablesPlanner.songsForm
          .updateButton[this.$root.$options.languages.current];
      }

      return this.$root.$options.languages.lang.tablesPlanner.songsForm
        .addButton[this.$root.$options.languages.current];
    },
    addSuccess() {
      return this.$root.$options.languages.lang.tablesPlanner.songsForm
        .addSuccess[this.$root.$options.languages.current];
    },
    updateSuccess() {
      return this.$root.$options.languages.lang.tablesPlanner.songsForm
        .updateSuccess[this.$root.$options.languages.current];
    },
  },
  methods: {
    onChangeGuest(guest) {
      this.selectedGuest = guest;
    },
    onContinue() {
      this.$emit("songsAdded");
    },
    onFilterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    onSong(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (this.hasSong) {
            this.requestUpdate(values);
          } else {
            this.requestAdd(values);
          }
        }
      });
    },
    async requestAdd(body) {
      try {
        this.form.resetFields();
        await add(body);
        this.$emit("updatedSong");

        // Message
        this.$message.success(this.addSuccess, 5);
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
    },
    async requestUpdate(body) {
      try {
        body.guestId = this.selectedGuest;
        const params = diffFields(this.songToUpdate, body);
        await updateById(this.songToUpdate._id, params);
        this.$emit("updatedSong");

        // Message
        this.$message.success(this.updateSuccess, 5);
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
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "song" });
  },
  async beforeMount() {
    // Get all Guests in Wedding
    this.guests = await gagiw();

    // Set init values in form
    if (this.hasSong) {
      this.selectedGuest = this.songToUpdate.guestId;

      this.form.setFieldsValue({
        artist: this.songToUpdate.artist,
        title: this.songToUpdate.title,
        url: this.songToUpdate.url,
      });
    }
  },
};
</script>
