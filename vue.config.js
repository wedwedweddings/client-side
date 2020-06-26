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
          'layout-header-background': "transparent", // layout background color
          'layout-footer-background': colors.primary.superDarker // layout background color
        },
        javascriptEnabled: true
      }
    }
  }
}
