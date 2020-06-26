<template>
  <a-form :form="form" @submit="onGuest">
    <!-- Guest Data -->
    <!-- Full Name -->
    <a-form-item class="guest-landing-form__item">
      <a-input
        v-decorator="[
          'fullName',
          {
            rules: [
              {
                required: true,
                message: fullNameValidator
              }
            ]
          },
        ]"
        :placeholder="fullNamePlaceholder"
        autofocus
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Menu -->
    <a-form-item class="guest-landing-form__item">
      <a-select
        v-decorator="[
          'menu',
          { rules: [{ required: true, message: menuValidator }] },
        ]"
        :placeholder="menuPlaceholder"
      >
        <a-select-option
          v-for="(menu, key) in menus"
          :key="key"
          :value="key"
        >{{ menu.emoji + " " + getMenuName(key) }}</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Email -->
    <a-form-item class="guest-landing-form__item">
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: emailValidator,
              }
            ],
          },
        ]"
        :placeholder="emailPlaceholder"
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-divider />

    <!-- Companion(s) Data -->
    <!-- TODO -->

    <!-- Update Guest -->
    <a-form-item class="guest-landing-form__item" style="text-align:center;">
      <a-button type="primary" html-type="submit">
        {{ guestButton}}
        <a-icon type="user-add" />
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// Models
//import { add, updateById } from "../../models/guest";
//import { getLast } from "../../models/wedding";

// Utils
import emojis from "../../../utils/emojis";
import menus from "../../../utils/menus";
import { capitalize } from "../../../utils/utils";

export default {
  name: "GuestLandingForm",
  data: () => ({
    emojis,
    menus,
    spouses: {
      one: {
        fullName: "Cónyuge 1",
        id: 1
      },
      two: {
        fullName: "Cónyuge 2",
        id: 2
      },
      both: {
        emoji: emojis.profile.both,
        fullName: "",
        id: 0
      }
    }
  }),
  computed: {
    // Lang
    fullNamePlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .placeholders.fullName[this.$root.$options.languages.current];
    },
    menuPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .placeholders.menu[this.$root.$options.languages.current];
    },
    emailPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .placeholders.email[this.$root.$options.languages.current];
    },
    fullNameValidator() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .validators.fullName[this.$root.$options.languages.current];
    },
    menuValidator() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .validators.menu[this.$root.$options.languages.current];
    },
    emailValidator() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .validators.email[this.$root.$options.languages.current];
    },
    guestButton() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .addButton[this.$root.$options.languages.current];
    },
    addSuccess() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .addSuccess[this.$root.$options.languages.current];
    },
    updateSuccess() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .updateSuccess[this.$root.$options.languages.current];
    },
    later() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm.later[
        this.$root.$options.languages.current
      ];
    },
    continueButton() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .continueButton[this.$root.$options.languages.current];
    }
  },
  methods: {
    onGuest(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.tags = this.selectedTags;

          // TODO: Update and Add methods here!
        }
      });
    },
    async requestAdd(/*body*/) {
      /*try {
        this.form.resetFields();
        await add(body);
        this.$emit("updatedGuest");

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
      }*/
    },
    async requestUpdate(/*body*/) {
      /*try {
        const params = diffFields(this.guestToUpdate, body);
        await updateById(this.guestToUpdate._id, params);
        this.$emit("updatedGuest");

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
      }*/
    },
    // Menu
    getMenuName(menu) {
      return capitalize(this.translateMenu(menu));
    },
    translateMenu(menu) {
      return this.menus[menu].name[this.$root.$options.languages.current];
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "guest" });
  },
  async beforeMount() {
    // TODO: Get Wedding info by Guest id
    // Set init values in form
    /*if (this.hasGuest) {
      this.form.setFieldsValue({
        fullName: this.guestToUpdate.fullName,
        menu: this.guestToUpdate.menu,
        email: this.guestToUpdate.email
      });
    }*/
  }
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
