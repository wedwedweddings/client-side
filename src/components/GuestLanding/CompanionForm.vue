<template>
  <div>
    <h4>📎😀</h4>

    <!-- Full Name -->
    <a-form-item class="guest-landing-form__item">
      <a-input :value="companion.fullName" :change="onChange" autofocus>
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Menu -->
    <a-form-item class="guest-landing-form__item">
      <a-select :value="companion.menu" :change="onChange">
        <a-select-option
          v-for="(menu, key) in menus"
          :key="key"
          :value="key"
        >{{ menu.emoji + " " + getMenuName(key) }}</a-select-option>
      </a-select>
    </a-form-item>
  </div>
</template>

<script>
// Utils
import menus from "../../../utils/menus";
import { capitalize } from "../../../utils/utils";

export default {
  name: "CompanionForm",
  data: () => ({ menus }),
  props: {
    companion: {
      type: Object,
      required: true,
      default() {
        return { fullName: "", menu: "" };
      },
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
  },
  model: {
    prop: "companion",
    event: "change",
  },
  methods: {
    // Any change
    onChange() {
      this.$emit("change", this.companion);
    },

    // Menu
    getMenuName(menu) {
      return capitalize(
        this.menus[menu].name[this.$root.$options.languages.current]
      );
    },
  },
  created() {
    console.log("CompanionForm > created:", this.companion);
  },
};
</script>