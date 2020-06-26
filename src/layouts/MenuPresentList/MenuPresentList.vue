<template>
  <div>
    <!-- Divider -->
    <a-divider orientation="left">
      <span class="settings-presents__divider">{{ presentsTitle }}</span>

      <a-tag :color="colors.lakeshore.hex">
        <strong>{{ presents.length }}</strong>
        {{ emojis.gift }}
      </a-tag>

      <a-button size="small" type="primary" ghost @click="onPresentModal">{{ addButton }}</a-button>
    </a-divider>

    <!-- Presents List -->
    <a-row>
      <a-col>
        <div
          class="settings-presents__list-infinite-container"
          :infinite-scroll-distance="distance"
        >
          <a-list size="small" :dataSource="presents">
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              style="border-bottom: 1px solid #8CBDD2"
            >
              <Present :present="item" @deletedPresent="onDeleted" @updatePresent="onUpdate" />
            </a-list-item>
          </a-list>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// Components
import Present from "../../components/Present/Present";

// Utils
import colors from "../../../utils/colors";
import emojis from "../../../utils/emojis";

export default {
  name: "MenuPresentList",
  components: {
    Present
  },
  props: ["content"],
  data: () => ({
    colors,
    distance: 10,
    emojis,
    presents: [],
    show: true
  }),
  computed: {
    // Lang
    presentsTitle() {
      return this.$root.$options.languages.lang.tablesPlanner.menu.presents[
        this.$root.$options.languages.current
      ];
    },
    addButton() {
      return this.$root.$options.languages.lang.tablesPlanner.menu.addButton[
        this.$root.$options.languages.current
      ];
    }
  },
  methods: {
    onDeleted(presentId) {
      this.$emit("deletedPresent", presentId);
    },
    onPresentModal() {
      this.$emit("presentModal");
    },
    onUpdate(present) {
      this.$emit("updatePresent", present);
    }
  },
  watch: {
    content() {
      this.presents = this.content ? this.content : [];
    }
  }
};
</script>

<style>
.settings-presents__divider {
  color: #e1e9f2;
  margin-right: 8px;
}

.settings-presents__divider-marriage {
  margin: 0 4px;
  cursor: pointer;
}
.settings-presents__list-infinite-container {
  background: white;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  max-height: 340px;
}

.settings-presents__list-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}

.ant-list-item-meta-description {
  font-size: 12px;
}
</style>
