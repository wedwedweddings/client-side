<template>
  <a-form :form="form" @submit="onSubmit">
    <!-- Spouse 1 -->
    <a-divider
      class="divider"
      orientation="left"
    >{{ this.spouses.one.emoji + " " + spouse1Placeholder }}</a-divider>

    <!-- First Name 1 -->
    <a-form-item class="wedding-form__item">
      <a-input
        v-decorator="[
          'firstName1',
          { rules: [{ required: true, message: firstName1Validator }] },
        ]"
        :placeholder="firstName1Placeholder"
        autofocus
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Last Name 1 -->
    <a-form-item class="wedding-form__item">
      <a-input
        v-decorator="[
          'lastName1',
          { rules: [{ required: true, message: lastName1Validator }] },
        ]"
        :placeholder="lastName1Placeholder"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Emoji 1 -->
    <a-form-item class="wedding-form__item">
      <a-select
        v-decorator="[
          'emoji1',
          { rules: [{ required: true, message: emoji1Validator }] },
        ]"
        :placeholder="emoji1Placeholder"
        @change="onChangeEmoji"
      >
        <a-select-option
          v-for="(emoji, key) in emojis.profile"
          :key="key"
          :value="key + '-1'"
        >{{ emoji }}</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Spouse 2 -->
    <a-divider
      class="divider"
      orientation="left"
    >{{ this.spouses.two.emoji + " " + spouse2Placeholder }}</a-divider>

    <!-- First Name 2 -->
    <a-form-item class="wedding-form__item">
      <a-input
        v-decorator="[
          'firstName2',
          { rules: [{ required: true, message: firstName2Validator }] },
        ]"
        :placeholder="firstName2Placeholder"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Last Name 2 -->
    <a-form-item class="wedding-form__item">
      <a-input
        v-decorator="[
          'lastName2',
          { rules: [{ required: true, message: lastName2Validator }] },
        ]"
        :placeholder="lastName2Placeholder"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Emoji 2 -->
    <a-form-item class="wedding-form__item">
      <a-select
        v-decorator="[
          'emoji2',
          { rules: [{ required: true, message: emoji2Validator }] },
        ]"
        :placeholder="emoji2Placeholder"
        @change="onChangeEmoji"
      >
        <a-select-option
          v-for="(emoji, key) in emojis.profile"
          :key="key"
          :value="key + '-2'"
        >{{ emoji }}</a-select-option>
      </a-select>
    </a-form-item>

    <!-- Submit -->
    <a-form-item class="register-form__item" style="text-align:center;">
      <a-button type="primary" html-type="submit">{{ continueButton }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// Models
import { add as aw } from "../../models/wedding";
import { add as atp } from "../../models/tablesPlanner";

// Utils
import emojis from "../../../utils/emojis";

export default {
  name: "WeddingForm",
  data: () => ({
    config: {
      rules: [
        {
          type: "object",
          required: true,
          message: "Please select time!"
        }
      ]
    },
    emojis: emojis,
    spouses: {
      one: {
        emoji: "",
        fullName: "",
        id: 1
      },
      two: {
        emoji: "",
        fullName: "",
        id: 2
      }
    }
  }),
  computed: {
    // Lang
    spouse1Placeholder() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.spouse1[this.$root.$options.languages.current];
    },
    firstName1Placeholder() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.firstName1[this.$root.$options.languages.current];
    },
    lastName1Placeholder() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.lastName1[this.$root.$options.languages.current];
    },
    emoji1Placeholder() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.emoji1[this.$root.$options.languages.current];
    },
    spouse2Placeholder() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.spouse2[this.$root.$options.languages.current];
    },
    firstName2Placeholder() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.firstName2[this.$root.$options.languages.current];
    },
    lastName2Placeholder() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.lastName2[this.$root.$options.languages.current];
    },
    emoji2Placeholder() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.emoji2[this.$root.$options.languages.current];
    },
    firstName1Validator() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.firstName1[this.$root.$options.languages.current];
    },
    lastName1Validator() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.lastName1[this.$root.$options.languages.current];
    },
    emoji1Validator() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.emoji1[this.$root.$options.languages.current];
    },
    spouse2Validator() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.spouse2[this.$root.$options.languages.current];
    },
    firstName2Validator() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.firstName2[this.$root.$options.languages.current];
    },
    lastName2Validator() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.lastName2[this.$root.$options.languages.current];
    },
    emoji2Validator() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .placeholders.emoji2[this.$root.$options.languages.current];
    },
    continueButton() {
      return this.$root.$options.languages.lang.gettingStarted.weddingForm
        .continueButton[this.$root.$options.languages.current];
    }
  },
  methods: {
    onChangeEmoji(e) {
      if (e.endsWith("-1")) {
        this.spouses.one.emoji = this.emojis.profile[e.split("-")[0]];
      } else if (e.endsWith("-2")) {
        this.spouses.two.emoji = this.emojis.profile[e.split("-")[0]];
      } else {
        this.spouses.one.emoji = "";
        this.spouses.two.emoji = "";
      }
    },
    onSubmit(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.requestAdd(values);
        }
      });
    },
    async requestAdd(body) {
      try {
        // Create Wedding in DB
        const wedding = await aw(body);
        localStorage.setItem("weddingId", wedding._id);

        // Create TablesPlanner in DB
        await atp();

        // Next step
        this.$emit("weddingCreated");
      } catch (error) {
        console.error(error);

        // Message
        this.$message.warning("Something failed! Please try again.", 5);
      }
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "wedding" });
  }
};
</script>

<style scoped>
.divider {
  margin: 32px 0 8px 0;
}

.wedding-form__item {
  margin-bottom: 8px;
}
</style>
