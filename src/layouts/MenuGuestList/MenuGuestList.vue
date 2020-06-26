<template>
  <div>
    <!-- Divider -->
    <a-divider orientation="left">
      <span class="settings-guests__divider">{{ guestsTitle }}</span>

      <a-tag :color="colors.lakeshore.hex">
        <strong>{{ guests.length }}</strong>
        {{ emojis.diner }}
      </a-tag>

      <a-button size="small" type="primary" ghost @click="onGuestModal">{{ addButton }}</a-button>
    </a-divider>

    <!-- Tags -->
    <a-row>
      <a-col>
        <div v-for="tag in this.tags" :key="tag.id">
          <a-tag
            :color="tagColor(tag.id)"
            style="float:left;margin-bottom:4px;"
            @click="onFilterByTag(tag.id)"
          >{{ translateTag(tag.id) }}</a-tag>
        </div>
      </a-col>
    </a-row>

    <br />

    <!-- Guests List -->
    <a-row>
      <a-col>
        <div class="settings-guests__list-infinite-container" :infinite-scroll-distance="distance">
          <a-list size="small" :dataSource="guests">
            <a-list-item
              slot="renderItem"
              slot-scope="item"
              style="border-bottom: 1px solid #8CBDD2"
            >
              <GuestListItem :guest="item" @deletedGuest="onDeleted" @updateGuest="onUpdate" />
            </a-list-item>
          </a-list>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
// Components
import GuestListItem from "../../components/GuestListItem/GuestListItem";

// Utils
import colors from "../../../utils/colors";
import emojis from "../../../utils/emojis";
import { tags } from "../../../utils/tags";

export default {
  name: "MenuGuestList",
  components: {
    GuestListItem
  },
  props: ["content", "filters"],
  data: () => ({
    colors,
    distance: 10,
    emojis,
    guests: [],
    show: true,
    tags
  }),
  computed: {
    // Lang
    guestsTitle() {
      return this.$root.$options.languages.lang.tablesPlanner.menu.guests[
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
    avatarStyle() {
      return `background:${colors.terracotta.hex}; color:${colors.parchment.hex}; fontSize:10px; fontWeight:bold;`;
    },
    avatarLetters(name) {
      return name
        .split(" ")
        .map(n => {
          return n.split("")[0];
        })
        .join("")
        .toUpperCase();
    },
    badgeColor(assistance) {
      if (assistance === true) {
        return "success";
      } else if (assistance === false) {
        return "error";
      }

      return "warning";
    },
    onDeleted(guestId) {
      this.$emit("deletedGuest", guestId);
    },
    onFilterByTag(tagId) {
      this.$emit("filterByTag", tagId);
    },
    onGuestModal() {
      this.$emit("guestModal");
    },
    onUpdate(guest) {
      this.$emit("updateGuest", guest);
    },
    tagColor(tagId) {
      if (this.filters && this.filters.tags.length > 0) {
        return this.filters.tags.includes(tagId)
          ? colors.terracotta.hex
          : colors.lakeshore.hex;
      }

      return colors.lakeshore.hex;
    },
    translateTag(tag) {
      const match = this.tags.filter(t => t.id === tag);
      return match[0].name[this.$root.$options.languages.current];
    }
  },
  watch: {
    content() {
      this.guests = this.content ? this.content : [];
    }
  }
};
</script>

<style>
.settings-guests__divider {
  color: #e1e9f2;
  margin-right: 8px;
}

.settings-guests__divider-marriage {
  margin: 0 4px;
  cursor: pointer;
}
.settings-guests__list-infinite-container {
  background: white;
  border-radius: 4px;
  overflow: auto;
  padding: 8px 24px;
  max-height: 340px;
}

.settings-guests__list-loading-container {
  position: absolute;
  bottom: 40px;
  width: 100%;
  text-align: center;
}

.ant-list-item-meta-description {
  font-size: 12px;
}
</style>
