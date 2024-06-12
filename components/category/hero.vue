<script setup lang="ts">
import { useAppStore } from '~/stores/appStore.js'
import languages from '~/content/language.json'
import type { CategoryHero, SupportedLanguage } from '~/types/language'

const HeroData: CategoryHero = languages.categoryhero

const appStore = useAppStore()

const selectedLanguage = useCookie<string>('language', {
  default: () => 'bn',
  path: '/',
})
</script>

<template>
  <div class="container mx-auto mt-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center">
      <div class="px-6">
        <h1 class="text-black dark:text-zinc-300 font-semibold leading-tight text-4xl md:text-6xl my-5">
          {{ HeroData.category[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
        </h1>
        <p class="dark:text-zinc-300">
          {{ HeroData.description[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
        </p>
      </div>

      <img src="../../assets/images/Code review-amico.svg">
    </div>
  </div>
</template>
