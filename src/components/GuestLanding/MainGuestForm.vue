<template>
  <a-card :title="mainGuestTitle">
    <!-- Full Name -->
    <a-form-item class="guest-landing-form__item">
      <a-input :value="mainGuest.fullName" :change="onChange" autofocus>
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Menu -->
    <a-form-item class="guest-landing-form__item">
      <a-select :value="mainGuest.menu" :change="onChange">
        <a-select-option
          v-for="(menu, key) in menus"
          :key="key"
          :value="key"
        >{{ menu.emoji + " " + getMenuName(key) }}</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Email -->
    <a-form-item class="guest-landing-form__item">
      <a-input :value="mainGuest.email" :change="onChange">
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Assistance -->
    <h4>¿Asistirás?</h4>

    <a-form-item class="guest-landing-form__item">
      <a-radio-group button-style="solid" default-value="yes">
        <a-radio-button value="yes">{{ getAssistance("yes") }}</a-radio-button>
        <a-radio-button value="no">{{ getAssistance("no") }}</a-radio-button>
        <a-radio-button value="pending">{{ getAssistance("pending") }}</a-radio-button>
      </a-radio-group>
    </a-form-item>
  </a-card>
</template>

<script>
import menus from "../../../utils/menus";
import { capitalize } from "../../../utils/utils";

export default {
  name: "MainGuestForm",
  data: () => ({ menus }),
  props: {
    mainGuest: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // Lang
    mainGuestTitle() {
      return this.$root.$options.languages.lang.guestLanding.mainGuestTitle[
        this.$root.$options.languages.current
      ];
    },
  },
  model: {
    prop: "mainGuest",
    event: "change",
  },
  methods: {
    // Any change
    onChange() {
      this.$emit("change", this.mainGuest);
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