// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],

  app: {},

  runtimeConfig: {
    github_api_token: '',
  },

  imports: {
  }
});