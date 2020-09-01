<template>
  <a-form class="weddings_form" :form="form" @submit="onSubmit">
    <!-- Email -->
    <a-form-item class="weddings_form-item">
      <a-input
        v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: emailValidator,
              },
              {
                required: true,
                message: emailValidator,
              },
            ],
          },
        ]"
        :placeholder="emailPlaceholder"
        autofocus
      >
        <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
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
import { forgotPassword } from "../../models/auth";

export default {
  name: "ForgotPasswordForm",
  computed: {
    // Lang
    emailPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .placeholders.email[this.$root.$options.languages.current];
    },
    emailValidator() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .validators.email[this.$root.$options.languages.current];
    },
    button() {
      return this.$root.$options.languages.lang.forgotPassword.button[
        this.$root.$options.languages.current
      ];
    },
    submitSuccess() {
      return this.$root.$options.languages.lang.forgotPassword.submitSuccess[
        this.$root.$options.languages.current
      ];
    },
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.requestForgotPassword(values);
        }
      });
    },
    async requestForgotPassword(body) {
      try {
        await forgotPassword(body);

        // Message
        this.$message.success(this.submitSuccess, 5);

        // Redirect to home after 5 seconds
        setTimeout(() => this.$router.push("/home"), 5000);
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
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "forgot-password" });
  },
};
</script>
