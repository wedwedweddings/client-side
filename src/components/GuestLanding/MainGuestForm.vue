<template>
  <div>
    <!-- Full Name -->
    <a-form-item class="weddings_form-item">
      <a-input
        type="text"
        v-decorator="[
          'mainGuestFullName',
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
        @change="onChangeFullName"
        autofocus
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Menu -->
    <a-form-item class="weddings_form-item">
      <a-select
        v-decorator="[
          'mainGuestMenu',
          { rules: [{ required: true, message: menuValidator }] },
        ]"
        :placeholder="menuPlaceholder"
        @change="onChangeMenu"
      >
        <a-select-option
          v-for="(menu, key) in menus"
          :key="key"
          :value="key"
        >{{ menu.emoji + " " + getMenuName(key) }}</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Email
    <a-form-item class="weddings_form-item">
      <a-input
        type="email"
        v-decorator="[
          'mainGuestEmail',
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
        @change="onChangeEmail"
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>-->

    <!-- Assistance -->
    <h4 class="assistance-item">{{ mainGuestAssistance }}</h4>

    <a-form-item class="weddings_form-item assistance-item">
      <a-radio-group
        button-style="solid"
        v-decorator="[
          'mainGuestAssistance',
        ]"
        @change="onChangeAssistance"
      >
        <a-radio-button value="yes">{{ getAssistance("yes") }}</a-radio-button>
        <a-radio-button value="no">{{ getAssistance("no") }}</a-radio-button>
        <a-radio-button value="pending">{{ getAssistance("pending") }}</a-radio-button>
      </a-radio-group>
    </a-form-item>
  </div>
</template>

<script>
import menus from "../../../utils/menus";
import { capitalize } from "../../../utils/utils";

export default {
  name: "MainGuestForm",
  data: () => ({
    inner: {},
    menus,
  }),
  props: {
    mainGuest: {
      required: true,
      type: Object,
    },
  },
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
    fullNameValidator() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .validators.fullName[this.$root.$options.languages.current];
    },
    menuValidator() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .validators.menu[this.$root.$options.languages.current];
    },
    mainGuestAssistance() {
      return this.$root.$options.languages.lang.guestLanding.assistance.heading[
        this.$root.$options.languages.current
      ];
    },
  },
  methods: {
    onChangeFullName(e) {
      this.inner = this.mainGuest;
      this.inner.fullName = e.target.value;
      this.$emit("change", this.inner);
    },
    onChangeMenu(e) {
      this.inner = this.mainGuest;
      this.inner.menu = e;
      this.$emit("change", this.inner);
    },
    onChangeAssistance(e) {
      this.inner = this.mainGuest;
      this.inner.assistance = e.target.value;
      this.$emit("change", this.inner);
    },
    // Menu
    getMenuName(menu) {
      return capitalize(
        this.menus[menu].name[this.$root.$options.languages.current]
      );
    },
    // Assistance
    getAssistance(answer) {
      return this.$root.$options.languages.lang.guestLanding.assistance[answer][
        this.$root.$options.languages.current
      ];
    },
  },
};
</script>