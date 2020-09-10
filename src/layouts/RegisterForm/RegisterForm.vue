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

    <!-- Warning -->
    <p class="message--warning">{{ warningPlaceholder }}</p>

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

    <!-- Confirm -->
    <a-form-item class="weddings_form-item" has-feedback>
      <a-input
        v-decorator="[
          'confirm',
          {
            rules: [
              {
                required: true,
                message: confirmPasswordPlaceholder,
                min: 8
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
        :placeholder="confirmPasswordPlaceholder"
        type="password"
        @blur="handleConfirmBlur"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>

    <!-- Terms and Conditions -->
    <a-form-item class="weddings_form-item" style="text-align:center;">
      <a-checkbox
        v-decorator="[
        'agreement',
        {
          valuePropName: 'checked'
        }
        ]"
      >
        <router-link :to="{ name: 'terms-and-conditions' }" target="_blank">{{ termsAndCondition }}</router-link>
      </a-checkbox>
    </a-form-item>

    <!-- Submit -->
    <a-form-item class="weddings_form-item" style="text-align:center;">
      <a-button type="primary" html-type="submit">{{ registerButton }}</a-button>
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
        {{ facebookButton }}
        <a-icon class="icon_facebook" type="facebook" />
      </a-button>
    </a-form-item>

    <a-divider />

    <!-- Have account or Forgot password -->
    <p style="text-align:center;">
      <router-link :to="{ name: 'login' }">{{ haveAccount }}</router-link>
      <span>&nbsp;|&nbsp;</span>
      <router-link :to="{ name: 'forgot-password' }">{{ forgotPassword }}</router-link>
    </p>
  </a-form>
</template>

<script>
// Models
import { register, registerWithFacebook } from "../../models/auth";
import { getCaptchaToken, postTokenToVerify } from "../../models/grecaptcha";

export default {
  name: "RegisterForm",
  data: () => ({
    confirmDirty: false,
  }),
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
    warningPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .placeholders.warning[this.$root.$options.languages.current];
    },
    passwordPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .placeholders.password[this.$root.$options.languages.current];
    },
    passwordValidator() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .validators.password[this.$root.$options.languages.current];
    },
    confirmPasswordPlaceholder() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .placeholders.confirmPassword[this.$root.$options.languages.current];
    },
    confirmPasswordValidator() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .validators.confirmPassword[this.$root.$options.languages.current];
    },
    termsAndCondition() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .termsAndConditions[this.$root.$options.languages.current];
    },
    registerButton() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .registerButton[this.$root.$options.languages.current];
    },
    haveFacebook() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .haveFacebook[this.$root.$options.languages.current];
    },
    facebookButton() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .facebookButton[this.$root.$options.languages.current];
    },
    haveAccount() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .haveAccount[this.$root.$options.languages.current];
    },
    forgotPassword() {
      return this.$root.$options.languages.lang.gettingStarted.registerForm
        .forgotPassword[this.$root.$options.languages.current];
    },
  },
  methods: {
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;

      if (value && value !== form.getFieldValue("password")) {
        callback(this.confirmPasswordValidator);
      } else {
        callback();
      }
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
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
          if (values.agreement === true) {
            this.requestRegister(values);
          }
        }
      });
    },
    async requestRegister(body) {
      try {
        await register(body);

        localStorage.isLoggedIn = true;

        this.$emit("registered");
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
          (response) => this.onFacebookRegister(response)
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
          (response) => this.onFacebookRegister(response)
        );
      }
    },
    async onFacebookRegister(response) {
      try {
        await registerWithFacebook({ email: response.email, id: response.id });

        localStorage.isLoggedIn = true;

        this.$emit("registered");
      } catch (error) {
        console.error(error);

        localStorage.clear();

        this.$router.push("/login");

        // Message
        this.$message.warning(
          this.$root.$options.languages.lang.common.loginAgain[
            this.$root.$options.languages.current
          ],
          5
        );
      }
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
};
</script>
