// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  srcDir: 'src/',
  alias: {
    '@': 'src/',
  },
  devServer: {
    port: 8000,
  },
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/scss/app.scss', '@mdi/font/css/materialdesignicons.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@invictus.codes/nuxt-vuetify',
    'nuxt-svgo',
  ],

  nitro: {
    devProxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/api',
        prependPath: true,
        changeOrigin: true,
      },
    },
  },
  svgo: {
    autoImportPath: './assets/svg',
    componentPrefix: 'svg',
  },
  vuetify: {
    moduleOptions: {
      useIconCDN: false,
      styles: 'sass',
      autoImport: true,
    },
  },
  vite: {
    optimizeDeps: {
      exclude: [
        'date-fns',
      ],
    },
  },
})
