<script setup lang="ts">
import { useAppStore } from '~/stores/appStore.js'
import languages from '~/content/language.json'
import type { FooterData, SupportedLanguage } from '~/types/language'

const footerData: FooterData = languages.footer

const appStore = useAppStore()

const selectedlanguage = useCookie< string >('language', {
  default: () => 'bn',
  path: '/',
})
</script>

<template>
  <div class="flex flex-col dark:text-zinc-300   my-5 md:my-0 md:justify-self-center">
    <p class="text-black dark:text-zinc-300  text-base font-semibold">
      {{ footerData.link.all_links[selectedlanguage ? selectedlanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
    </p>
    <NuxtLink to="/" class="hover:underline">
      {{ footerData.link.home[selectedlanguage ? selectedlanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
    </NuxtLink>
    <NuxtLink to="/about" class="hover:underline">
      {{ footerData.link.about[selectedlanguage ? selectedlanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
    </NuxtLink>
  </div>
</template>
