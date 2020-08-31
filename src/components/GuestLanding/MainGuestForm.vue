<template>
  <a-card :title="mainGuestTitle">
    <!-- Full Name -->
    <a-form-model-item class="guest-landing-form__item">
      <a-input type="text" v-model="value.fullName" :change="onChange" autofocus>
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>

    <!-- Menu -->
    <a-form-model-item class="guest-landing-form__item">
      <a-select v-model="value.menu" :change="onChange">
        <a-select-option
          v-for="(menu, key) in menus"
          :key="key"
          :value="key"
        >{{ menu.emoji + " " + getMenuName(key) }}</a-select-option>
      </a-select>
    </a-form-model-item>

    <!-- Email -->
    <a-form-model-item class="guest-landing-form__item">
      <a-input
        type="email"
        v-model="value.email"
        :change="onChange"
        :placeholder="emailPlaceholder"
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>

    <!-- Assistance -->
    <h4>¿Asistirás?</h4>

    <a-form-model-item class="guest-landing-form__item">
      <a-radio-group
        button-style="solid"
        default-value="yes"
        v-model="value.assistance"
        :change="onChange"
      >
        <a-radio-button value="yes">{{ getAssistance("yes") }}</a-radio-button>
        <a-radio-button value="no">{{ getAssistance("no") }}</a-radio-button>
        <a-radio-button value="pending">{{ getAssistance("pending") }}</a-radio-button>
      </a-radio-group>
    </a-form-model-item>
  </a-card>
</template>

<script>
import menus from "../../../utils/menus";
import { capitalize } from "../../../utils/utils";

export default {
  name: "MainGuestForm",
  data: () => ({ menus }),
  props: ["value"],
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
    mainGuestTitle() {
      return this.$root.$options.languages.lang.guestLanding.mainGuestTitle[
        this.$root.$options.languages.current
      ];
    },
  },
  methods: {
    // Any change
    onChange() {
      this.$emit("input", this.value);
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