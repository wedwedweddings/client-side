<template>
  <a-form class="weddings_form" :form="form" @submit="onGuest">
    <!-- Full Name -->
    <a-form-item class="weddings_form-item">
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
    <a-form-item class="weddings_form-item">
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
    <a-form-item class="weddings_form-item">
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
    <a-form-item
      class="weddings_form-item"
      v-if="!hasGuest || guestToUpdate.accompanying === 'main-guest'"
    >
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
    <p class="message--warning" v-if="!hasGuest">{{ warningMessage }}</p>

    <!-- Tags -->
    <a-form-item class="weddings_form-item" style="text-align:center;">
      <a-checkbox
        style="font-size:12px;"
        :defaultChecked="hasGuest ? isTagSelected(t.id) : false"
        :key="t.id"
        :name="t.id"
        v-for="t in tags"
        @change="onChangeTag"
      >{{ translateTag(t.id) }}</a-checkbox>
    </a-form-item>

    <!-- Invitation link -->
    <div v-if="hasGuest && guestToUpdate.accompanying === 'main-guest'">
      <a-form-item class="weddings_form-item" style="text-align:center;">
        <p class="message--warning">
          {{ invitationLinkMessage }} {{ guestToUpdate.fullName }}.
          <br />
          ⚠️ {{ invitationLinkWarning }}
          <span class="warning--detail">{{ guestToUpdate.fullName }}</span> ⚠️.
          <br />
          <a-icon class="invitation-link" type="copy" @click="copyInvitationLink" />
        </p>
      </a-form-item>
    </div>

    <!-- Add Guest -->
    <a-form-item class="weddings_form-item" style="text-align:center;">
      <a-button type="primary" html-type="submit">
        {{ guestButton}}
        <a-icon type="user-add" />
      </a-button>
    </a-form-item>

    <a-divider v-if="visible" />

    <!-- Continue -->
    <a-form-item class="weddings_form-item" style="text-align:center;" v-if="visible">
      <p>{{ later }}</p>
      <a-button size="small" type="primary" ghost @click="onContinue">{{ continueButton }}</a-button>
    </a-form-item>

    <input class="dummy-to-copy" style="opacity:0" />
  </a-form>
</template>

<script>
// Models
import { add, updateById, generateInvitation } from "../../models/guest";
import { getUserLastPlanner as gulp } from "../../models/wedding";

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
    invitationLink: "",
    menus,
    spouses: {
      one: {
        fullName: "Cónyuge 1",
        id: 1,
      },
      two: {
        fullName: "Cónyuge 2",
        id: 2,
      },
      both: {
        emoji: emojis.profile.both,
        fullName: "",
        id: 0,
      },
    },
    selectedTags: [],
    tags,
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
    warningMessage() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .warning[this.$root.$options.languages.current];
    },
    invitationLinkMessage() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .invitationLinkMessage[this.$root.$options.languages.current];
    },
    invitationLinkWarning() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .invitationLinkWarning[this.$root.$options.languages.current];
    },
    copiedLink() {
      return this.$root.$options.languages.lang.gettingStarted.guestsForm
        .copiedLink[this.$root.$options.languages.current];
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
    },
  },
  methods: {
    copyInvitationLink() {
      //
      const dummy = document.querySelector("input.dummy-to-copy");
      dummy.value = this.invitationLink;

      // Select the text field
      dummy.select();
      dummy.setSelectionRange(0, 99999); // For mobile devices

      // Copy the text inside the text field
      document.execCommand("copy");

      // Message
      this.$message.success(this.copiedLink, 5);
    },
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
      Object.keys(body).forEach((key) => {
        if (body[key] === undefined) {
          body[key] = "";
        }
      });

      try {
        await add(body);
        this.$emit("updatedGuest");

        // Message
        this.$message.success(this.addSuccess, 5);

        // Clear tags
        this.selectedTags = [];
        this.clearTags();
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
    clearTags() {
      const tagsElems = Array.from(
        document.querySelectorAll(".weddings_form-item [type='checkbox']")
      );

      tagsElems.forEach((t) => {
        if (
          Array.from(t.parentElement.classList).includes("ant-checkbox-checked")
        ) {
          t.parentElement.classList.remove("ant-checkbox-checked");
        }
      });
    },
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
        if (!this.selectedTags.includes(e.target.name)) {
          this.selectedTags.push(e.target.name);
        }
      } else {
        const found = this.selectedTags.findIndex((tag) => {
          return tag === e.target.name;
        });

        if (found >= 0) {
          this.selectedTags.splice(found);
        }
      }

      this.selectedTags.sort();
    },
    translateTag(tag) {
      const match = this.tags.filter((t) => t.id === tag);
      return match[0].name[this.$root.$options.languages.current];
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "guest" });
  },
  async beforeMount() {
    // Get Wedding ID
    await gulp();

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
        email: this.guestToUpdate.email,
      });

      // Invitation link
      this.invitationLink = await generateInvitation(this.guestToUpdate._id);
    }
  },
};
</script>
