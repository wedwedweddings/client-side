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
                message: emailPlaceholder,
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

    <!-- Password -->
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
              }
            ],
          },
        ]"
        :placeholder="passwordPlaceholder"
        type="password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Submit -->
    <a-form-item class="weddings_form-item" style="text-align:center;">
      <a-button type="primary" html-type="submit">{{ button }}</a-button>
    </a-form-item>

    <a-divider />

    <!-- Facebook -->

    <a-form-item class="weddings_form-item weddings_form-item--facebook" style="text-align:center;">
      <p class="haveFacebook">{{ haveFacebook }}</p>

      <a-button
        class="btn_facebook--login"
        data-size="large"
        data-button-type="continue_with"
        data-layout="default"
        data-auto-logout-link="false"
        data-use-continue-as="false"
        @click="getFacebookState"
      >
        {{ buttonFacebook }}
        <a-icon class="icon_facebook" type="facebook" />
      </a-button>
    </a-form-item>

    <a-divider />

    <!-- Login or Forgot password -->
    <p style="text-align:center;">
      <router-link :to="{ name: 'getting-started' }">{{ noAccount }}</router-link>
      <span>&nbsp;|&nbsp;</span>
      <router-link :to="{ name: 'forgot-password' }">{{ forgotPassword }}</router-link>
    </p>
  </a-form>
</template>

<script>
// Models
import { login, loginWithFacebook } from "../../models/auth";
import { getCaptchaToken, postTokenToVerify } from "../../models/grecaptcha";

export default {
  name: "LoginForm",
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
    passwordPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .placeholders.password[this.$root.$options.languages.current];
    },
    passwordValidator() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .validators.password[this.$root.$options.languages.current];
    },
    button() {
      return this.$root.$options.languages.lang.login.button[
        this.$root.$options.languages.current
      ];
    },
    haveFacebook() {
      return this.$root.$options.languages.lang.login.haveFacebook[
        this.$root.$options.languages.current
      ];
    },
    buttonFacebook() {
      return this.$root.$options.languages.lang.login.buttonFacebook[
        this.$root.$options.languages.current
      ];
    },
    noAccount() {
      return this.$root.$options.languages.lang.login.noAccount[
        this.$root.$options.languages.current
      ];
    },
    forgotPassword() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .forgotPassword[this.$root.$options.languages.current];
    },
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      let token;
      let confirm = false;

      try {
        token = await getCaptchaToken();
      } catch (error) {
        console.error(error);
      }

      if (!token) return;

      try {
        const response = await postTokenToVerify(token);
        confirm = response.success;
      } catch (error) {
        console.error(error);
      }

      if (!confirm) return;

      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.requestLogin(values);
        }
      });
    },
    async requestLogin(body) {
      try {
        await login(body);

        localStorage.isLoggedIn = true;

        this.$router.push("/tables-planner");
      } catch (error) {
        console.error(error);

        localStorage.clear();

        // Message
        this.$message.warning(
          this.$root.$options.languages.lang.common.failMessage[
            this.$root.$options.languages.current
          ],
          5
        );
      }
    },
    // Facebook
    getFacebookState() {
      window.FB.getLoginStatus(this.checkFacebookStatus);
    },
    checkFacebookStatus(response) {
      if (response.status !== "connected") {
        window.FB.login(this.onFacebookResponseAfterLogin, {
          scope: "public_profile,email",
        });
      } else {
        window.FB.api(
          `/${response.authResponse.userID}`,
          { fields: "email" },
          (response) => this.onFacebookLogin(response)
        );
      }
    },
    onFacebookResponseAfterLogin(response) {
      if (
        response.status === "connected" &&
        response.authResponse &&
        response.authResponse.userID !== ""
      ) {
        window.FB.api(
          `/${response.authResponse.userID}`,
          { fields: "email" },
          (response) => this.onFacebookLogin(response)
        );
      }
    },
    async onFacebookLogin(response) {
      try {
        await loginWithFacebook({ email: response.email, id: response.id });

        localStorage.isLoggedIn = true;

        this.$router.push("/tables-planner");
      } catch (error) {
        console.error(error);

        localStorage.clear();

        this.$router.push("/getting-started");

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
    this.form = this.$form.createForm(this, { name: "login" });
  },
};
</script>
