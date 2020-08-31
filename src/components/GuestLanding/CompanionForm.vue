<template>
  <div>
    <!-- Full Name -->
    <a-form-model-item class="guest-landing-form__item" prop="companionFullName">
      <a-input type="text" v-model="companion.fullName" :change="onChange" autofocus>
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>

    <!-- Menu -->
    <a-form-model-item class="guest-landing-form__item" prop="companionMenu">
      <a-select v-model="companion.menu" :change="onChange">
        <a-select-option
          v-for="(menu, key) in menus"
          :key="key"
          :value="key"
        >{{ menu.emoji + " " + getMenuName(key) }}</a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item>
      <a-button style="float: right;" size="small" @click="setTotalCompanionBlocks('delete')">
        {{ deleteCompanion}}
        <a-icon type="user-delete" />
      </a-button>
    </a-form-model-item>
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
    index: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // Lang
    deleteCompanion() {
      return this.$root.$options.languages.lang.guestLanding.deleteCompanion[
        this.$root.$options.languages.current
      ];
    },
  },
  model: {
    prop: "companion",
    event: "change",
  },
  methods: {
    // Any change
    onChange() {
      this.$emit("change", {
        companion: this.companion,
        index: this.index,
      });
    },

    // Menu
    getMenuName(menu) {
      return capitalize(
        this.menus[menu].name[this.$root.$options.languages.current]
      );
    },
  },
};
</script>