<template>
  <a-layout class="tables-planner_container">
    <!-- Modals -->
    <TablesPlannerModal
      :formType="currentModal"
      :guestToUpdate="guestToUpdate"
      :presentToUpdate="presentToUpdate"
      :songToUpdate="songToUpdate"
      @closeModal="onCloseModal"
      @updatedGuest="onUpdatedGuest"
      @updatedPresent="onUpdatedPresent"
      @updatedSong="onUpdatedSong"
    />

    <!-- Menu -->
    <a-layout-sider class="tables-planner_sider" :width="siderWidth">
      <TablesPlannerMenu
        :filters="filters"
        :guests="guests"
        :presents="presents"
        :songs="songs"
        @deletedGuest="onUpdatedGuest"
        @deletedPresent="onUpdatedPresent"
        @deletedSong="onUpdatedSong"
        @filterByTag="onFilterByTag"
        @guestModal="onGuestModal"
        @presentModal="onPresentModal"
        @songModal="onSongModal"
        @updateGuest="onUpdateGuest"
        @updatePresent="onUpdatePresent"
        @updateSong="onUpdateSong"
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
import { getAllInWedding as gasiw } from "../../models/song";
import {
  getInWedding as gtpinw,
  updateById as utpbi,
} from "../../models/tablesPlanner";
import { getUserLastPlanner as gulp } from "../../models/wedding";

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
    songs: [],
    songToUpdate: {},
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

      // #️⃣ Get User last Wedding created and set id in localStorage
      try {
        await gulp();
      } catch (error) {
        // Message
        this.$message.warning(
          this.$root.$options.languages.lang.common.loginAgain[
            this.$root.$options.languages.current
          ],
          5
        );

        // Restore session
        localStorage.clear();
        this.$router.push("/");

        console.error(
          "Error: Get User last Wedding created and set id in localStorage:",
          error
        );
      }

      // #️⃣ Get all data
      this.getData();
    },
    async getData() {
      // #️⃣ Get all Guests in Wedding
      try {
        this.guests = await gagiw();
      } catch (error) {
        console.error("Error: Get all Guests in Wedding:", error);
      }

      // #️⃣ Get all Presents in Wedding
      try {
        this.presents = await gapiw();
      } catch (error) {
        console.error("Error: Get all Presents in Wedding:", error);
      }

      // #️⃣ Get all Songs in Wedding
      try {
        this.songs = await gasiw();
      } catch (error) {
        console.error("Error: Get all Songs in Wedding:", error);
      }

      // #️⃣ Get seats per table in Wedding
      try {
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
      this.songToUpdate = {};
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

      await this.getData();
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
      await this.getData();
    },
    onUpdatePresent(present) {
      this.presentToUpdate = present;
      this.currentModal = "present";
    },
    // Song
    onSongModal() {
      this.currentModal = "song";
    },
    async onUpdatedSong() {
      await this.getData();
    },
    onUpdateSong(song) {
      this.songToUpdate = song;
      this.currentModal = "song";
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
    // Add event to resize layout
    window.addEventListener("resize", this.onWindowResize);

    // Init layout
    this.onWindowResize();
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
