<template>
  <a-form class="weddings_form" :form="form" @submit="onSubmit">
    <p class="message--warning">{{ warningPlaceholder }}</p>

    <a-form-item class="weddings_form-item" has-feedback>
      <a-input
        v-decorator="[
          'password',
          {
            rules: [
              {
                required: true,
                message: passwordValidator,
                min: 8
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
        :placeholder="passwordPlaceholder"
        type="password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <a-form-item class="weddings_form-item" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: confirmValidator,
                min: 8
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        :placeholder="confirmPlaceholder"
        type="password"
        @blur="handleConfirmBlur"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Submit -->
    <a-form-item class="weddings_form-item" style="text-align:center;">
      <a-button type="primary" html-type="submit">{{ button }}</a-button>
    </a-form-item>
  </a-form>
</template>

<script>
// Models
import { resetPassword } from "../../models/auth";

export default {
  name: "ResetPasswordForm",
  props: ["resetPasswordToken"],
  data: () => ({
    confirmDirty: false,
  }),
  computed: {
    // Lang
    warningPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .placeholders.warning[this.$root.$options.languages.current];
    },
    passwordPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .placeholders.password[this.$root.$options.languages.current];
    },
    confirmPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .placeholders.confirmPassword[this.$root.$options.languages.current];
    },
    passwordValidator() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .validators.password[this.$root.$options.languages.current];
    },
    confirmValidator() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .validators.confirmPassword[this.$root.$options.languages.current];
    },
    button() {
      return this.$root.$options.languages.lang.resetPassword.button[
        this.$root.$options.languages.current
      ];
    },
    submitSuccess() {
      return this.$root.$options.languages.lang.resetPassword.submitSuccess[
        this.$root.$options.languages.current
      ];
    },
  },
  methods: {
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;

      if (value && value !== form.getFieldValue("password")) {
        callback(this.confirmValidator);
      } else {
        callback();
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    onSubmit(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.requestResetPassword(values);
        }
      });
    },
    async requestResetPassword(body) {
      try {
        await resetPassword(body, this.resetPasswordToken);

        // Message
        this.$message.success(this.submitSuccess, 5);

        this.$emit("reseted");
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
    validateToNextPassword(rule, value, callback) {
      const form = this.form;

      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }

      callback();
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "reset-password" });
  },
};
</script>