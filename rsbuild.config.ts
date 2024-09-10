import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginLess } from '@rsbuild/plugin-less'



export default defineConfig({
  plugins: [pluginReact(), pluginLess()],
  html: {
    template: './index.html'
  },
  source: {
    entry: {
      index: './src/main.tsx'
    },
  }
})