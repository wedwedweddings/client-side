<template>
  <a-popover trigger="click">
    <!-- With Guest -->
    <span slot="title" v-if="withContent">{{ getCurrentGuest().fullName }}</span>
    <a-icon
      slot="title"
      style="float:right; margin-top:4px;"
      type="delete"
      v-if="withContent"
      @click="onCleanSeat"
    />
    <template slot="content" v-if="withContent">
      <p>{{ getGuestDescription() }}</p>
    </template>

    <!-- Without Guest -->
    <span slot="title" v-if="!withContent">{{ seatSelectGuest }}</span>
    <a-select
      slot="content"
      style="width:100%;"
      showSearch
      :filterOption="onFilterOption"
      :notFoundContent="fetching ? undefined : null"
      :placeholder="seatSelectGuest"
      v-if="!withContent"
      @change="onSelectGuest"
    >
      <a-spin v-if="fetching" slot="notFoundContent" size="small" />
      <a-select-option value>{{ none }}</a-select-option>
      <a-select-option
        :value="g._id"
        v-for="g in guests"
        :key="g._id"
      >{{ g.seat.length > 0 ? emojis.checked + " " + g.fullName : g.fullName }}</a-select-option>
    </a-select>

    <!-- Seat Shape -->
    <div :class="`seat__body ${seatColor}`"></div>
  </a-popover>
</template>

<script>
// Controllers
import { getDescription } from "../../controllers/guest";

// Models
import { updateById } from "../../models/guest";

// Utils
import emojis from "../../../utils/emojis";

export default {
  name: "Seat",
  data: () => ({
    angle: 0,
    emojis,
    fetching: false,
    guestId: "",
    pos: {
      x: 0,
      y: 0,
    },
    rad: 0,
    seatAngle: 0,
    width: 0,
  }),
  props: ["alias", "filters", "guests", "index", "tableType", "total"],
  computed: {
    filteredByTags() {
      if (this.withContent && this.filters.tags.length > 0) {
        const g = this.getCurrentGuest();

        let tags = [];

        if (g.tags.length > 0) {
          if (g.tags.indexOf(",") !== -1) {
            tags = g.tags.split(",");
          } else {
            tags.push(g.tags);
          }
        }

        const matches = tags.filter((t) => {
          return this.filters.tags.includes(t);
        });

        return matches.length === this.filters.tags.length;
      }

      return false;
    },
    filterGuests() {
      return this.guests.filter((g) => g.seat === "");
    },
    seatColor() {
      if (
        this.withContent &&
        (!this.filters.tags || this.filters.tags.length === 0)
      ) {
        return "seat__body__filled";
      } else if (this.filters.tags.length > 0) {
        if (this.filteredByTags) {
          return "seat__body__filtered";
        } else {
          return "seat__body__not-filtered";
        }
      }

      return "seat__body__empty";
    },
    withContent() {
      return this.guests.filter((g) => g.seat === this.alias).length > 0;
    },
    // Lang
    none() {
      return this.$root.$options.languages.lang.common.none[
        this.$root.$options.languages.current
      ];
    },
    seatSelectGuest() {
      return this.$root.$options.languages.lang.tablesPlanner.planner
        .seatSelectGuest[this.$root.$options.languages.current];
    },
  },
  methods: {
    getGuestDescription() {
      return getDescription(this.getCurrentGuest(), [
        this.$root.$options.languages.current,
      ]);
    },
    getCurrentGuest() {
      if (this.withContent) {
        this.guestId = this.guests.filter((g) => g.seat === this.alias)[0]._id;
      }

      const filtered = this.guests.filter((g) => {
        return g._id === this.guestId;
      });

      return filtered[0];
    },
    init() {
      // Width
      this.width = this.$el.parentElement.clientWidth * 0.2;

      // Rotation
      this.angle = 360 / this.total;
      this.seatAngle = this.index * this.angle;
      this.rad = this.seatAngle * (Math.PI / 180);

      // Position
      this.pos.x =
        Math.cos(this.rad) * this.$el.parentElement.clientWidth * 0.7 +
        Math.floor(this.$el.parentElement.clientWidth * 0.5) -
        Math.floor(this.width * 0.5);
      this.pos.y =
        Math.sin(this.rad) * this.$el.parentElement.clientWidth * 0.7 +
        Math.floor(this.$el.parentElement.clientWidth * 0.5) -
        Math.floor(this.width * 0.5);

      // Set width
      this.$el.style.width = this.$el.style.height = `${this.width}px`;

      // Set transform
      this.$el.style.transform = `matrix(1, 0, 0, 1, ${this.pos.x}, ${this.pos.y}) rotate(${this.seatAngle}deg)`;
    },
    async onCleanSeat() {
      try {
        await updateById(this.guestId, { seat: "" });
        this.$emit("updatedGuest");
        this.guestId = "";
      } catch (error) {
        console.error(error);
      }
    },
    onFilterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    async onSelectGuest(guestId) {
      // If selected Guest is the same...
      if (guestId === this.guestId) {
        return;
      }

      // Set new guest
      try {
        await updateById(guestId, { seat: this.alias });
        this.$emit("updatedGuest");
        this.guestId = guestId;
      } catch (error) {
        console.error(error);
      }
    },
  },
  watch: {
    total: function () {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  updated() {
    this.init();
  },
};
</script>

<style scoped>
.seat__body {
  position: absolute;
  min-width: 8px;
  max-width: 32px;
  min-height: 8px;
  max-height: 32px;
  border-radius: 2px;
  cursor: pointer;
}

.seat__body__empty {
  background: #8cbdd2;
}

.seat__body__filled {
  background: black;
}

.seat__body__filtered {
  background: rgba(219, 137, 121, 0.8) !important;
}

.seat__body__not-filtered {
  background: rgba(219, 137, 121, 0.2) !important;
}
</style>
