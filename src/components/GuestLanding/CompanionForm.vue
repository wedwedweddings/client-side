<template>
  <div>
    <!-- Full Name -->
    <a-form-item class="weddings_form-item">
      <a-input
        type="text"
        :defaultValue="companion && companion.fullName !== '' ? companion.fullName : undefined"
        :name="`companion${index}FullName`"
        :placeholder="fullNamePlaceholder"
        autofocus
        @change="onChangeFullName"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Menu -->
    <a-form-item class="weddings_form-item">
      <a-select
        :defaultValue="companion && companion.menu !== '' ? companion.menu : undefined"
        :name="`companion${index}Menu`"
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

    <!-- Delete -->
    <a-form-item class="weddings_form-item">
      <a-button style="float: right;" size="small" @click="onRemove()">
        {{ deleteCompanion}}
        <a-icon type="user-delete" />
      </a-button>
    </a-form-item>
  </div>
</template>

<script>
// Utils
import menus from "../../../utils/menus";
import { capitalize } from "../../../utils/utils";

export default {
  name: "CompanionForm",
  data: () => ({
    inner: {},
    menus,
  }),
  props: {
    companion: {
      type: Object,
    },
    index: {
      type: Number,
      required: true,
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
    deleteCompanion() {
      return this.$root.$options.languages.lang.guestLanding.deleteCompanion[
        this.$root.$options.languages.current
      ];
    },
  },
  methods: {
    // Any change
    onChangeFullName(e) {
      this.inner.fullName = e.target.value;

      this.$emit("change", {
        companion: this.inner,
        index: this.index,
      });
    },
    onChangeMenu(e) {
      this.inner.menu = e;

      this.$emit("change", {
        companion: this.inner,
        index: this.index,
      });
    },

    // Remove companion
    onRemove() {
      this.$emit("remove", this.index);
    },

    // Menu
    getMenuName(menu) {
      return capitalize(
        this.menus[menu].name[this.$root.$options.languages.current]
      );
    },
  },
  created() {
    this.inner = this.companion
      ? this.companion
      : {
          fullName: "",
          menu: "standard",
        };
  },
};
</script>