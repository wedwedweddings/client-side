<template>
  <div>
    <a-divider class="catering-calculator__divider" orientation="left">
      {{ budget }}
      <a-tag :color="totalColor">
        <strong>{{ total }}</strong>
        {{ emojis.money }}
      </a-tag>
    </a-divider>

    <a-row type="flex" justify="space-around">
      <a-col>
        <!-- Menus -->
        <a-row v-for="(menu, k) in menus" :key="k">
          <a-col :span="3">
            <span class="catering-calculator__span-total">{{ getTotalPerType(k) }}</span>
          </a-col>

          <a-col :span="11">
            <span class="catering-calculator__span">{{ menu.emoji + " " + getMenuName(k) }}</span>
          </a-col>

          <a-col :span="9">
            <a-input
              class="catering-calculator__input-price"
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
      vegetarian: 50
    },
    totalColor: colors.lakeshore.hex
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
    }
  },
  methods: {
    getTotal() {
      let total = 0;

      Object.keys(this.menus).forEach(key => {
        total += this.getTotalPerType(key) * this.price[key];
      });

      return total;
    },
    getTotalPerType(type) {
      const total = this.guests.filter(g => {
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
    }
  },
  watch: {
    content() {
      this.guests = this.content ? this.content : [];
    }
  }
};
</script>

<style scoped>
.catering-calculator__divider {
  color: #e1e9f2;
}

.catering-calculator__span {
  color: #e1e9f2;
  margin-right: 4px;
}

.catering-calculator__span-total {
  border: 1px solid #e1e9f2;
  border-radius: 2px;
  color: #e1e9f2;
  font-weight: bold;
  padding: 0 4px;
}

.catering-calculator__input-price {
  margin-bottom: 4px;
}
</style>
