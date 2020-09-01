<template>
  <div
    :class="`table-circle_container ${containerClass}`"
    :style="`width:${width}px;`"
    @click="onTableCircle"
  >
    <!-- Options -->
    <div v-if="isSelected">
      <a-row class="table-circle_row" type="flex" justify="space-around">
        <a-col span="16">
          <span>{{ table + " " + parseInt(currentTable + 1) }}</span>
        </a-col>

        <a-col span="4" justify="right" v-if="guestsInTable.length > 0">
          <a-icon type="unordered-list" @click="onSwitch" />
        </a-col>

        <a-col span="4" justify="right">
          <a-icon type="delete" @click="onDeleteConfirm(ref)" />
        </a-col>
      </a-row>
    </div>

    <!-- List -->
    <div class="table-circle_list-container" v-if="!this.showTable">
      <a-list class="table-circle_list" :dataSource="guestsInTable">
        <a-list-item
          class="table-circle_list-item"
          slot="renderItem"
          slot-scope="item"
        >· {{ item.fullName }}</a-list-item>
      </a-list>
    </div>

    <!-- Circle -->
    <div
      class="table-circle_body"
      :style="`width:${tableWidth}px; height:${tableWidth}px; margin:${tableMargin * 0.5}px ${tableMargin}px; background:${tableColor};`"
      v-if="this.showTable"
    >
      <!-- Seats -->
      <Seat
        tableType="circle"
        :alias="`${alias}--s-${i}`"
        :key="`${alias}--s-${i}`"
        :filters="filters"
        :guests="guests"
        :index="i"
        :total="totalSeats"
        v-for="(s, i) in seatsPerTable[tableIndex]"
        @updatedGuest="onUpdatedGuest"
      />
    </div>

    <!-- Seats Input -->
    <div v-if="isSelected && showTable">
      <a-row class="table-circle_row" type="flex" justify="center">
        <a-col>
          <a-input
            size="small"
            type="number"
            :addonAfter="emojis.diner"
            :defaultValue="seatsPerTable[tableIndex]"
            :min="1"
            :max="maxSeatsPerTable"
            @change="onChangeInputSeats"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
// Utils
import colors from "../../../utils/colors";
import emojis from "../../../utils/emojis";

// Components
import Seat from "../Seat/Seat";

export default {
  name: "TableCircle",
  components: {
    Seat,
  },
  props: [
    "alias",
    "currentTable",
    "filters",
    "guests",
    "maxSeatsPerTable",
    "seatsPerTable",
    "tableIndex",
  ],
  data: () => ({
    emojis,
    ref: this,
    tableMargin: 0,
    tableWidth: 0,
    showTable: true,
    totalSeats: 0,
    width: 0,
  }),
  computed: {
    containerClass() {
      if (this.isSelected) {
        return "table-circle_container--selected";
      }

      return "";
    },
    guestsInTable() {
      if (this.guests.length > 0) {
        return this.guests.filter((g) => {
          if (g.seat !== "") {
            let table = g.seat.split("--t-")[1];
            table = parseInt(table.substr(0, table.indexOf("--")));
            return this.tableIndex === table;
          }
        });
      }

      return [];
    },
    isSelected() {
      return this.currentTable === this.tableIndex;
    },
    tableColor() {
      return this.isSelected ? colors.lakeshore.hex : colors.terracotta.hex;
    },
    // Lang
    table() {
      return this.$root.$options.languages.lang.tablesPlanner.planner.table[
        this.$root.$options.languages.current
      ];
    },
    deleteConfirm() {
      return this.$root.$options.languages.lang.tablesPlanner.planner
        .deleteConfirm[this.$root.$options.languages.current];
    },
    deleteConfirmYes() {
      return this.$root.$options.languages.lang.tablesPlanner.planner
        .deleteConfirmYes[this.$root.$options.languages.current];
    },
  },
  methods: {
    delete() {
      this.$emit("deleteTable", this.tableIndex);
    },
    onChangeInputSeats(e) {
      this.totalSeats = e.target.valueAsNumber;
      this.$emit("changeInputSeats", e.target.valueAsNumber);
    },
    onDeleteConfirm(ref) {
      this.$confirm({
        title: this.deleteConfirm,
        okText: this.deleteConfirmYes,
        okType: "danger",
        cancelText: "No",
        onOk() {
          ref.delete();
        },
      });
    },
    onSwitch() {
      if (this.guestsInTable.length > 0) {
        this.showTable = !this.showTable;
      }
    },
    onTableCircle() {
      this.$emit("tableCircle", this.tableIndex);
    },
    onUpdatedGuest() {
      this.$emit("updatedGuest");
    },
    init() {
      this.width = this.$el.parentElement.clientWidth;
      this.tableWidth = this.width * 0.4;
      this.tableMargin = (this.width - this.tableWidth) * 0.5;

      this.totalSeats = this.seatsPerTable[this.tableIndex];
    },
  },
  watch: {
    guests() {
      this.init();
    },
  },
  beforeMount() {
    this.ref = this;
  },
  mounted() {
    this.init();
  },
  beforeUpdate() {
    if (!this.isSelected) {
      this.showTable = true;
    }
  },
};
</script>
