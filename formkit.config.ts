// formkit.config.ts
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
// import '@formkit/themes/genesis'

export default defaultConfig({
  config: {
    rootClasses,
  },
})