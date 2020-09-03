<template>
  <a-layout class="tables-planner_container">
    <!-- Modals -->
    <TablesPlannerModal
      :formType="currentModal"
      :guestToUpdate="guestToUpdate"
      :presentToUpdate="presentToUpdate"
      @closeModal="onCloseModal"
      @updatedGuest="onUpdatedGuest"
      @updatedPresent="onUpdatedPresent"
    />

    <!-- Menu -->
    <a-layout-sider class="tables-planner_sider" :width="siderWidth">
      <TablesPlannerMenu
        :filters="filters"
        :guests="guests"
        :presents="presents"
        @deletedGuest="onUpdatedGuest"
        @deletedPresent="onUpdatedPresent"
        @filterByTag="onFilterByTag"
        @guestModal="onGuestModal"
        @presentModal="onPresentModal"
        @updateGuest="onUpdateGuest"
        @updatePresent="onUpdatePresent"
      />
    </a-layout-sider>

    <!-- Content -->
    <a-layout-content class="tables-planner_content" v-if="siderWidth !== '100vw'">
      <a-card class="weddings_card" :title="plannerTitle" :bordered="false">
        <!-- Buttons -->
        <a-button
          size="small"
          slot="extra"
          type="primary"
          ghost
          @click="onAddTable"
        >{{ addTableButton }}</a-button>

        <!-- Tables -->
        <a-row
          type="flex"
          justify="space-around"
          class="tables-planner_row"
          v-for="(r, i) in totalRows"
          :key="`tables-planner__r-${i}`"
        >
          <a-col
            v-for="(c, j) in totalCols(i)"
            :key="`tables-planner__r-${i}--t-${tableIndex(i, j)}`"
            :span="colSpan"
          >
            <TableCircle
              :alias="`tables-planner__r-${i}--t-${tableIndex(i, j)}`"
              :currentTable="currentTable"
              :filters="filters"
              :guests="guests"
              :tableIndex="tableIndex(i, j)"
              :maxSeatsPerTable="maxSeatsPerTable"
              :seatsPerTable="seatsPerTable"
              @changeInputSeats="onChangeInputSeats"
              @deleteTable="onDeleteTable"
              @tableCircle="onTableCircle"
              @updatedGuest="onUpdatedGuest"
            />
          </a-col>
        </a-row>
      </a-card>
    </a-layout-content>
  </a-layout>
</template>

<script>
// Components
import TableCircle from "../../components/TableCircle/TableCircle";
//import TableRect from "../../components/TableRect/TableRect";

// Layouts
import TablesPlannerModal from "../../layouts/TablesPlannerModal/TablesPlannerModal";
import TablesPlannerMenu from "../../layouts/TablesPlannerMenu/TablesPlannerMenu";

// Models
import { getAllInWedding as gagiw } from "../../models/guest";
import { getAllInWedding as gapiw } from "../../models/present";
import {
  getInWedding as gtpinw,
  updateById as utpbi,
} from "../../models/tablesPlanner";
import { getLast } from "../../models/wedding";

export default {
  name: "TablesPlanner",
  components: {
    TableCircle,
    //TableRect,
    TablesPlannerModal,
    TablesPlannerMenu,
  },
  data: () => ({
    currentModal: "",
    currentTable: 0,
    filters: {
      tags: [],
      spouses: [],
    },
    guests: [],
    guestToUpdate: {},
    maxSeatsPerTable: 12,
    presents: [],
    presentToUpdate: {},
    seatsPerTable: [],
    siderWidth: "25vw",
    tablesPerRow: 4,
    tablesPlannerId: "",
  }),
  computed: {
    colSpan() {
      return Math.floor(24 / this.tablesPerRow) - 1;
    },
    totalRows() {
      return Math.floor(this.seatsPerTable.length / this.tablesPerRow) + 1;
    },
    // Lang
    metaTitle() {
      return this.$root.$options.languages.lang.tablesPlanner.meta.title[
        this.$root.$options.languages.current
      ];
    },
    plannerTitle() {
      return this.$root.$options.languages.lang.tablesPlanner.planner.title[
        this.$root.$options.languages.current
      ];
    },
    addTableButton() {
      return this.$root.$options.languages.lang.tablesPlanner.planner
        .addTableButton[this.$root.$options.languages.current];
    },
    deleteSuccess() {
      return this.$root.$options.languages.lang.tablesPlanner.planner
        .deleteSuccess[this.$root.$options.languages.current];
    },
  },
  methods: {
    async init() {
      this.onWindowResize();

      try {
        // Get last User Wedding created and set id in localStorage
        await getLast();
      } catch (error) {
        console.error(
          "Error: Get last User Wedding created and set id in localStorage:",
          error
        );
      }

      try {
        // Get all Guests in Wedding
        this.guests = await gagiw();
      } catch (error) {
        console.error("Error: Get all Guests in Wedding:", error);
      }

      try {
        // Get all Presents in Wedding
        this.presents = await gapiw();
      } catch (error) {
        console.error("Error: Get all Presents in Wedding:", error);
      }

      try {
        // Get seats per table in Wedding
        const tp = await gtpinw();
        this.tablesPlannerId = tp._id;

        this.seatsPerTable = JSON.parse(tp.seatsPerTable);
      } catch (error) {
        console.error("Error: Get seats per table in Wedding:", error);
      }
    },
    onWindowResize() {
      if (window.innerWidth <= 600) {
        this.tablesPerRow = 2;
        this.siderWidth = "100vw";
      } else if (window.innerWidth <= 900) {
        this.tablesPerRow = 1;
        this.siderWidth = "50vw";
      } else if (window.innerWidth <= 1200) {
        this.tablesPerRow = 3;
        this.siderWidth = "40vw";
      } else {
        this.tablesPerRow = 4;
        this.siderWidth = "25vw";
      }
    },
    onCloseModal() {
      this.guestToUpdate = {};
      this.presentToUpdate = {};
      this.currentModal = "";
    },
    // Guest
    onFilterByTag(tagId) {
      if (!this.filters.tags.includes(tagId)) {
        this.filters.tags.push(tagId);
      } else {
        const i = this.filters.tags.findIndex((tag) => {
          return tag === tagId;
        });

        this.filters.tags.splice(i, 1);
      }

      this.filters.tags.sort();
    },
    onGuestModal() {
      this.currentModal = "guest";
    },
    async onUpdatedGuest() {
      await utpbi(this.tablesPlannerId, {
        seatsPerTable: JSON.stringify(this.seatsPerTable),
      });

      this.guests = await gagiw();
    },
    onUpdateGuest(guest) {
      this.guestToUpdate = guest;
      this.currentModal = "guest";
    },
    // Present
    onPresentModal() {
      this.currentModal = "present";
    },
    async onUpdatedPresent() {
      this.presents = await gapiw();
    },
    onUpdatePresent(present) {
      this.presentToUpdate = present;
      this.currentModal = "present";
    },
    // Tables & Seats
    async onAddTable() {
      this.seatsPerTable.push(1);

      await utpbi(this.tablesPlannerId, {
        seatsPerTable: JSON.stringify(this.seatsPerTable),
      });
    },
    async onChangeInputSeats(seatsPerTable) {
      this.seatsPerTable[this.currentTable] = seatsPerTable;

      await utpbi(this.tablesPlannerId, {
        seatsPerTable: JSON.stringify(this.seatsPerTable),
      });
    },
    async onDeleteTable(tableToDelete) {
      if (this.seatsPerTable.length > 1) {
        this.seatsPerTable.splice(tableToDelete, 1);

        await utpbi(this.tablesPlannerId, {
          seatsPerTable: JSON.stringify(this.seatsPerTable),
        });

        // Message
        this.$message.success(this.deleteSuccess, 5);
      }
    },
    onTableCircle(currentTable) {
      this.currentTable = currentTable;
    },
    tableIndex(row, col) {
      return this.tablesPerRow * row + col;
    },
    totalCols(row) {
      return row < this.totalRows - 1
        ? this.tablesPerRow
        : this.seatsPerTable.length % this.tablesPerRow;
    },
  },
  created() {
    this.onWindowResize();

    window.addEventListener("resize", this.onWindowResize);
  },
  beforeMount() {
    this.init();
  },
  metaInfo() {
    return {
      // if no subcomponents specify a metaInfo.title, this title will be used
      title: this.metaTitle,
      // all titles will be injected into this template
      titleTemplate: "%s | Wed Wed Weddings",
    };
  },
};
</script>
