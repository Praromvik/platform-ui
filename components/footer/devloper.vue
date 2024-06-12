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
  <div>
    <p class="text-black dark:text-zinc-300   text-2xl py-1 font-semibold">
      {{ footerData.developer.header[selectedlanguage ? selectedlanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
    </p>
    <p class="py-2 dark:text-zinc-300  ">
      {{ footerData.developer.description[selectedlanguage ? selectedlanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
    </p>
    <div class="my-3 space-x-3 pb-3">
      <NuxtLink
        to="https://discord.gg/uv2hQaCH"
        target="_blank"
        class="p-2 bg-gray-300 text-gray-800 rounded-md dark:bg-sky-700 dark:text-[#F1F2F4]"
        aria-label="Github"
      >
        <Icon name="ic:baseline-discord" size="1em" />
      </NuxtLink>
      <NuxtLink
        to="https://www.linkedin.com/company/praromvik/"
        target="_blank"
        class="p-2 bg-gray-300 text-gray-800 rounded-md dark:bg-sky-700 dark:text-[#F1F2F4]"
        aria-label="LinkedIn"
      >
        <Icon name="fa:linkedin-square" size="1em" />
      </NuxtLink>
      <NuxtLink
        to="https://twitter.com/PraromvikHq"
        target="_blank"
        class="p-2 bg-gray-300 text-gray-800 rounded-md dark:bg-sky-700 dark:text-[#F1F2F4]"
        aria-label="Twitter"
      >
        <Icon name="fa:twitter-square" size="1em" />
      </NuxtLink>
      <NuxtLink
        to="https://www.facebook.com/profile.php?id=61557462003505"
        target="_blank"
        class="p-2 bg-gray-300 text-gray-800 rounded-md dark:bg-sky-700 dark:text-[#F1F2F4]"
        aria-label="StackOverflow"
      >
        <Icon name="ri:facebook-fill" size="1em" />
      </NuxtLink>
    </div>
  </div>
</template>
