// vue.config.js

const colors = require('./utils/colors')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': colors.lakeshore.hex, // primary color for all components
          'link-color': colors.lakeshore.hex, // link color
          'success-color': '#52c41a', // success state color
          'warning-color': '#faad14', // warning state color
          'error-color': '#f5222d', // error state color
          'font-size-base': '14px', // major text font size
          'heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
          'text-color': 'rgba(0, 0, 0, 0.65)', // major text color
          'text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
          'disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
          'border-radius-base': '4px', // major border radius
          'border-color-base': '#d9d9d9', // major border color
          'box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)', // major shadow for layers,
          'background-color-light': colors.blueFog.hex, // background color
          'background-color-base': colors.primary.superLight, // background color
          'layout-body-background': colors.blueFog.hex, // layout background color
          'layout-header-background': 'transparent', // layout background color
          'layout-footer-background': colors.primary.superDarker, // layout background color
        },
        javascriptEnabled: true,
      },
      scss: {
        prependData: `@import '@/assets/scss/abstracts/mixins.scss';`,
        prependData: `@import '@/assets/scss/abstracts/variables.scss';`,

        prependData: `@import '@/assets/scss/base/animations.scss';`,
        prependData: `@import '@/assets/scss/base/base.scss';`,
        prependData: `@import '@/assets/scss/base/typography.scss';`,

        prependData: `@import '@/assets/scss/components/button.scss';`,
        prependData: `@import '@/assets/scss/components/card.scss';`,
        prependData: `@import '@/assets/scss/components/form.scss';`,
        prependData: `@import '@/assets/scss/components/guest-avatar.scss';`,
        prependData: `@import '@/assets/scss/components/steps.scss';`,
        prependData: `@import '@/assets/scss/components/table-circle.scss';`,

        prependData: `@import '@/assets/scss/layout/content.scss';`,
        prependData: `@import '@/assets/scss/layout/footer.scss';`,
        prependData: `@import '@/assets/scss/layout/header.scss';`,
        prependData: `@import '@/assets/scss/layout/tables-planner-menu.scss';`,

        prependData: `@import '@/assets/scss/pages/faq.scss';`,
        prependData: `@import '@/assets/scss/pages/forgot-password.scss';`,
        prependData: `@import '@/assets/scss/pages/getting-started.scss';`,
        prependData: `@import '@/assets/scss/pages/index.scss';`,
        prependData: `@import '@/assets/scss/pages/login.scss';`,
        prependData: `@import '@/assets/scss/pages/privacy-policy.scss';`,
        prependData: `@import '@/assets/scss/pages/reset-password.scss';`,
        prependData: `@import '@/assets/scss/pages/tables-planner.scss';`,
        prependData: `@import '@/assets/scss/pages/terms-and-conditions.scss';`,

        prependData: `@import '@/assets/scss/main.scss';`,
      },
    },
  },
}
