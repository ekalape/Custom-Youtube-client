import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';


export default defineConfig({
  plugins: [pluginReact()
  ],
  html: {
    favicon: './src/assets/icons/favicon.ico',
  },
  source: {
    define: {
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    }
  }


});

