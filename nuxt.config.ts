// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-16',
      viewport: 'width=device-width,initial-scale=1',
      title: 'প্রারম্ভিক ',
      titleTemplate: '%s -প্রারম্ভিক',
      meta: [{ name: 'description', content: 'প্রারম্ভিক' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  sitemap: {
    strictNuxtContentPaths: true,
  },
  site: {
    url: 'http://praromvik.org',
    identity: {
      type: 'Person',
    },
    twitter: '@qdnvubp',
  },

  typescript: {
    strict: true,
  },
  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
      ],
    },
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'light',
  },

  modules: [
     (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    'nuxt-icon',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-og-image',
    '@nuxt/content',
    '@nuxtjs/robots',
    '@nuxtjs/fontaine',
    '@nuxtjs/color-mode',
    'nuxt-simple-sitemap',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    "@stefanobartoletti/nuxt-social-share"
  ],

  content: {
    highlight: {
      theme: 'dracula',
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  vite: {
      vue: {
        template: {
          transformAssetUrls,
        },
      },
    },
})