<template>
  <a-form :form="form" @submit="onGuest">
    <!-- Full Name -->
    <a-form-item class="guest-form__item">
      <a-input
        v-decorator="[
          'fullName',
          {
            rules: [
              {
                required: true,
                message: fullNameValidator
              }
            ]
          },
        ]"
        :placeholder="fullNamePlaceholder"
        autofocus
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Relative -->
    <a-form-item class="guest-form__item">
      <a-select
        v-decorator="[
          'relative',
          { rules: [{ required: true, message: relativeValidator }] },
        ]"
        :placeholder="relativePlaceholder"
      >
        <a-select-option
          v-for="(spouse, key) in spouses"
          :key="key + spouse.fullName"
          :value="spouse.id"
        >{{ spouse.emoji + " " + spouse.fullName }}</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Menu -->
    <a-form-item class="guest-form__item">
      <a-select
        v-decorator="[
          'menu',
          { rules: [{ required: true, message: menuValidator }] },
        ]"
        :placeholder="menuPlaceholder"
      >
        <a-select-option
          v-for="(menu, key) in menus"
          :key="key"
          :value="key"
        >{{ menu.emoji + " " + getMenuName(key) }}</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Email -->
    <a-form-item class="guest-form__item">
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: emailValidator,
              }
            ],
          },
        ]"
        :placeholder="emailPlaceholder"
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Warning -->
    <p class="guest-form__invitation-email__warning">{{ warningPlaceholder }}</p>

    <!-- Tags -->
    <a-form-item class="guest-form__item" style="text-align:center;">
      <a-checkbox
        style="font-size:12px;"
        :defaultChecked="hasGuest ? isTagSelected(t.id) : false"
        :key="t.id"
        :value="t.id"
        v-for="t in tags"
        @change="onChangeTag"
      >{{ translateTag(t.id) }}</a-checkbox>
    </a-form-item>

    <!-- Add Guest -->
    <a-form-item class="guest-form__item" style="text-align:center;">
      <a-button type="primary" html-type="submit">
        {{ guestButton}}
        <a-icon type="user-add" />
      </a-button>
    </a-form-item>

    <a-divider v-if="visible" />

    <!-- Continue -->
    <a-form-item class="guest-form__item" style="text-align:center;" v-if="visible">
      <p>{{ later }}</p>
      <a-button size="small" type="primary" ghost @click="onContinue">{{ continueButton }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// Models
import { add, updateById } from "../../models/guest";
import { getLast } from "../../models/wedding";

// Utils
import emojis from "../../../utils/emojis";
import menus from "../../../utils/menus";
import { tags } from "../../../utils/tags";
import { capitalize, diffFields } from "../../../utils/utils";

export default {
  name: "GuestForm",
  props: ["guestToUpdate"],
  data: () => ({
    emojis,
    menus,
    spouses: {
      one: {
        fullName: "Cónyuge 1",
        id: 1
      },
      two: {
        fullName: "Cónyuge 2",
        id: 2
      },
      both: {
        emoji: emojis.profile.both,
        fullName: "",
        id: 0
      }
    },
    selectedTags: [],
    tags
  }),
  computed: {
    hasGuest() {
      return this.guestToUpdate && Object.keys(this.guestToUpdate).length > 0;
    },
    visible() {
      return this.$route.name === "getting-started";
    },
    // Lang
    fullNamePlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .placeholders.fullName[this.$root.$options.languages.current];
    },
    relativePlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .placeholders.relative[this.$root.$options.languages.current];
    },
    menuPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .placeholders.menu[this.$root.$options.languages.current];
    },
    emailPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .placeholders.email[this.$root.$options.languages.current];
    },
    warningPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .placeholders.warning[this.$root.$options.languages.current];
    },
    fullNameValidator() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .validators.fullName[this.$root.$options.languages.current];
    },
    relativeValidator() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .validators.relative[this.$root.$options.languages.current];
    },
    menuValidator() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .validators.menu[this.$root.$options.languages.current];
    },
    emailValidator() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .validators.email[this.$root.$options.languages.current];
    },
    bothSpouses() {
      return this.$root.$options.languages.current === "es" ? "Ambos" : "Both";
    },
    guestButton() {
      if (this.hasGuest) {
        return this.$root.$options.languages.lang.gettingStarted.guestsForm
          .updateButton[this.$root.$options.languages.current];
      }

      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .addButton[this.$root.$options.languages.current];
    },
    addSuccess() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .addSuccess[this.$root.$options.languages.current];
    },
    updateSuccess() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .updateSuccess[this.$root.$options.languages.current];
    },
    later() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm.later[
        this.$root.$options.languages.current
      ];
    },
    continueButton() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .continueButton[this.$root.$options.languages.current];
    }
  },
  methods: {
    onGuest(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          values.tags = this.selectedTags;

          if (this.hasGuest) {
            this.requestUpdate(values);
          } else {
            this.requestAdd(values);
          }
        }
      });
    },
    onContinue() {
      this.$emit("guestsAdded");
    },
    async requestAdd(body) {
      try {
        this.form.resetFields();
        await add(body);
        this.$emit("updatedGuest");

        // Message
        this.$message.success(this.addSuccess, 5);
      } catch (error) {
        console.error(error);

        // Message
        this.$message.warning(
          this.$root.$options.languages.lang.common.failMessage[
            this.$root.$options.languages.current
          ],
          5
        );
      }
    },
    async requestUpdate(body) {
      try {
        const params = diffFields(this.guestToUpdate, body);
        await updateById(this.guestToUpdate._id, params);
        this.$emit("updatedGuest");

        // Message
        this.$message.success(this.updateSuccess, 5);
      } catch (error) {
        console.error(error);

        // Message
        this.$message.warning(
          this.$root.$options.languages.lang.common.failMessage[
            this.$root.$options.languages.current
          ],
          5
        );
      }
    },
    // Menu
    getMenuName(menu) {
      return capitalize(this.translateMenu(menu));
    },
    translateMenu(menu) {
      return this.menus[menu].name[this.$root.$options.languages.current];
    },
    // Tags
    checkSelectedTagsAtInit() {
      if (this.hasGuest) {
        if (this.guestToUpdate.tags.indexOf(",") === -1) {
          if (!this.selectedTags.includes(this.guestToUpdate.tags)) {
            this.selectedTags.push(this.guestToUpdate.tags);
          }
        } else {
          const updatedTags = this.guestToUpdate.tags.split(",");

          for (let i = 0; i < updatedTags.length; i++) {
            if (!this.selectedTags.includes(updatedTags[i])) {
              this.selectedTags.push(updatedTags[i]);
            }
          }
        }
      }
    },
    isTagSelected(tag) {
      if (this.hasGuest) {
        if (this.guestToUpdate.tags.indexOf(",") === -1) {
          return tag === this.guestToUpdate.tags;
        }

        return this.guestToUpdate.tags.split(",").includes(tag);
      }

      return false;
    },
    onChangeTag(e) {
      if (e.target.checked) {
        if (!this.selectedTags.includes(e.target.value)) {
          this.selectedTags.push(e.target.value);
        }
      } else {
        const found = this.selectedTags.findIndex(tag => {
          return tag === e.target.value;
        });

        if (found >= 0) {
          this.selectedTags.splice(found);
        }
      }

      this.selectedTags.sort();
    },
    translateTag(tag) {
      const match = this.tags.filter(t => t.id === tag);
      return match[0].name[this.$root.$options.languages.current];
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "guest" });
  },
  async beforeMount() {
    // Get Wedding ID
    await getLast();

    // Getting spouses from local storage
    if (localStorage.spouses) {
      this.spouses = JSON.parse(localStorage.spouses);
    }

    this.spouses.both.fullName = this.bothSpouses;

    // Set init values in form
    if (this.hasGuest) {
      this.checkSelectedTagsAtInit();

      this.form.setFieldsValue({
        fullName: this.guestToUpdate.fullName,
        menu: this.guestToUpdate.menu,
        relative: this.guestToUpdate.relative,
        email: this.guestToUpdate.email
      });
    }
  }
};
</script>

<style scoped>
.divider {
  margin: 32px 0 8px 0;
}

.guest-form__item {
  margin-bottom: 8px;
}

.guest-form__invitation-email__warning {
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 12px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  margin: 0;
  margin-bottom: 8px;
  padding: 8px 16px;
  position: relative;
  text-align: center;
  word-wrap: break-word;
}
</style>
