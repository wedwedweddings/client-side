<template>
  <div class="catering-calculator_container">
    <!-- Divider -->
    <a-divider class="divider" orientation="left">
      {{ budget }}
      <a-tag :color="totalColor">
        <strong>{{ total }}</strong>
        {{ emojis.money }}
      </a-tag>
    </a-divider>

    <!-- Menus -->
    <a-row type="flex" justify="space-around" v-for="(menu, k) in menus" :key="k">
      <a-col :span="3">
        <span class="catering-calculator_span-total">{{ getTotalPerType(k) }}</span>
      </a-col>

      <a-col :span="11">
        <span class="catering-calculator_span-menu">{{ menu.emoji + " " + getMenuName(k) }}</span>
      </a-col>

      <a-col :span="9">
        <a-input
          class="catering-calculator_input-price"
          size="small"
          type="number"
          :addonAfter="emojis.money"
          :min="1"
          :max="100000"
          v-model="price[k]"
          @change="getTotal"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script>
// Utils
import colors from "../../../utils/colors";
import emojis from "../../../utils/emojis";
import menus from "../../../utils/menus";
import { capitalize } from "../../../utils/utils";

export default {
  name: "CateringCalculator",
  props: ["content"],
  data: () => ({
    emojis: emojis,
    guests: [],
    menus: menus,
    price: {
      allergen: 60,
      children: 30,
      other: 40,
      standard: 40,
      vegan: 60,
      vegetarian: 50,
    },
    totalColor: colors.lakeshore.hex,
  }),
  computed: {
    total() {
      return this.getTotal();
    },
    // Lang
    budget() {
      return this.$root.$options.languages.lang.tablesPlanner.menu.budget[
        this.$root.$options.languages.current
      ];
    },
  },
  methods: {
    getTotal() {
      let total = 0;

      Object.keys(this.menus).forEach((key) => {
        total += this.getTotalPerType(key) * this.price[key];
      });

      return total;
    },
    getTotalPerType(type) {
      const total = this.guests.filter((g) => {
        return g.menu === type;
      });

      return total.length;
    },
    // Menu
    getMenuName(menu) {
      return capitalize(this.translateMenu(menu));
    },
    translateMenu(menu) {
      return this.menus[menu].name[this.$root.$options.languages.current];
    },
  },
  watch: {
    content() {
      this.guests = this.content ? this.content : [];
    },
  },
};
</script>
