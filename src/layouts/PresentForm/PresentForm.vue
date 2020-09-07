<template>
  <a-form class="weddings_form" :form="form" @submit="onPresent">
    <!-- Title -->
    <a-form-item class="weddings_form-item">
      <a-input
        v-decorator="[
          'title',
          { rules: [{ required: true, message: titleValidator }] },
        ]"
        :placeholder="titlePlaceholder"
        autofocus
      >
        <a-icon slot="prefix" type="gift" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- URL -->
    <a-form-item class="weddings_form-item">
      <a-input v-decorator="[
          'url'
        ]" placeholder="URL">
        <a-icon slot="prefix" type="shopping" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Bought by -->
    <a-form-item class="weddings_form-item" style="text-align:center;">
      <a-select
        showSearch
        :placeholder="boughtByPlaceholder"
        :filterOption="onFilterOption"
        :initialValue="selectedGuestFullName !== '' ? selectedGuestFullName : none"
        :notFoundContent="fetching ? undefined : null"
        v-decorator="[
          'guestId'
        ]"
        @change="onChangeGuest"
      >
        <a-spin v-if="fetching" slot="notFoundContent" size="small" />
        <a-select-option value>{{ none }}</a-select-option>
        <a-select-option :value="g._id" v-for="g in guests" :key="g._id">{{ g.fullName }}</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Add Present -->
    <a-form-item class="weddings_form-item" style="text-align:center;">
      <a-button type="primary" html-type="submit">
        {{ presentButton }}
        <a-icon type="plus-circle" />
      </a-button>
    </a-form-item>

    <a-divider v-if="visible" />

    <!-- Continue -->
    <a-form-item class="weddings_form-item" style="text-align:center;" v-if="visible">
      <p>{{ later }}</p>
      <a-button size="small" type="primary" ghost @click="onContinue">{{ continueButton }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// Models
import { getAllInWedding as gagiw } from "../../models/guest";
import { add, updateById } from "../../models/present";

// Utils
import { diffFields } from "../../../utils/utils";

export default {
  name: "GuestForm",
  props: ["presentToUpdate"],
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
          return found;
        }

        return "";
      }

      return "";
    },
    hasPresent() {
      return (
        this.presentToUpdate && Object.entries(this.presentToUpdate).length > 0
      );
    },
    visible() {
      return this.$route.name === "getting-started";
    },
    // Lang
    none() {
      return this.$root.$options.languages.lang.common.none[
        this.$root.$options.languages.current
      ];
    },
    titlePlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.presentsForm
        .placeholders.title[this.$root.$options.languages.current];
    },
    titleValidator() {
      return this.$root.$options.languages.lang.gettingStarted.presentsForm
        .validators.title[this.$root.$options.languages.current];
    },
    boughtByPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.presentsForm
        .placeholders.boughtByPlaceholder[
        this.$root.$options.languages.current
      ];
    },
    presentButton() {
      if (this.hasPresent) {
        return this.$root.$options.languages.lang.gettingStarted.presentsForm
          .updateButton[this.$root.$options.languages.current];
      }

      return this.$root.$options.languages.lang.gettingStarted.presentsForm
        .addButton[this.$root.$options.languages.current];
    },
    addSuccess() {
      return this.$root.$options.languages.lang.gettingStarted.presentsForm
        .addSuccess[this.$root.$options.languages.current];
    },
    updateSuccess() {
      return this.$root.$options.languages.lang.gettingStarted.presentsForm
        .updateSuccess[this.$root.$options.languages.current];
    },
    later() {
      return this.$root.$options.languages.lang.gettingStarted.presentsForm
        .later[this.$root.$options.languages.current];
    },
    continueButton() {
      return this.$root.$options.languages.lang.gettingStarted.presentsForm
        .continueButton[this.$root.$options.languages.current];
    },
  },
  methods: {
    onChangeGuest(guest) {
      this.selectedGuest = guest;
    },
    onContinue() {
      this.$emit("presentsAdded");
    },
    onFilterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    onPresent(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          if (this.hasPresent) {
            this.requestUpdate(values);
          } else {
            this.requestAdd(values);
          }
        }
      });
    },
    async requestAdd(body) {
      Object.keys(body).forEach((key) => {
        if (body[key] === undefined) {
          body[key] = "";
        }
      });

      try {
        await add(body);
        this.$emit("updatedPresent");

        // Reset form
        this.form.resetFields();

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
        const params = diffFields(this.presentToUpdate, body);
        await updateById(this.presentToUpdate._id, params);
        this.$emit("updatedPresent");

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
    this.form = this.$form.createForm(this, { name: "present" });
  },
  async beforeMount() {
    // Get all Guests in Wedding
    try {
      this.guests = await gagiw();
    } catch (error) {
      console.error(error);
    }

    // Set init values in form
    if (this.hasPresent) {
      this.selectedGuest = this.presentToUpdate.guestId;

      this.form.setFieldsValue({
        title: this.presentToUpdate.title,
        url: this.presentToUpdate.url,
        guestId: this.selectedGuest,
      });
    }
  },
};
</script>
