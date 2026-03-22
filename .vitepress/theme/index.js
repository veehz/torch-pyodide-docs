import DefaultTheme from 'vitepress/theme'
import PytorchLink from './components/PytorchLink.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('PytorchLink', PytorchLink)
  }
}
