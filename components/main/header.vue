<script setup lang="ts">
import languages from '~/content/language.json'
import type { HeaderData, SupportedLanguage } from '~/types/language'
import { useAppStore } from '~/stores/appStore.js'

const headerData: HeaderData = languages.header
const route = useRoute()

const path = computed(() => route.fullPath.replace('/', ''))
const isMenuOpen = ref(false)
// Access the store
const appStore = useAppStore()

const colorMode = useColorMode()
function onClick(val: string) {
  colorMode.preference = val
}
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}
const selectedlanguage = useCookie<string>('language', {
  default: () => 'bn',
  path: '/',
})

function toggleLanguage(language: string) {
  selectedlanguage.value = language
  appStore.setLanguage(language)
}
</script>

<template>
  <div class="py-5 border-b dark:border-gray-800 font-semibold">
    <div class="flex px-6 container max-w-6xl justify-between mx-auto">
      <ul class="flex items-center space-x-5">
        <li class="text-base sm:flex font-bold">
          <NuxtLink to="/" :class="{ underline: path === '' }" class="flex items-center space-x-2">
            <NuxtImg src="/logo.png" width="115" height="80" quality="50" class="rounded-md" />
          </NuxtLink>
        </li>
      </ul>

      <ul class="flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg">
        <!-- This section is for Menu in desktop mode -->
        <ul class="hidden sm:flex items-center space-x-3 sm:space-x-6 text-sm sm:text-lg">
          <li title="Categories" :class="{ underline: path === 'categories' }">
            <NuxtLink to="/categories" aria-label="About me">
              {{ headerData.category[selectedlanguage as SupportedLanguage] }}
            </NuxtLink>
          </li>
          <li title="About Us" :class="{ underline: path === 'about' }">
            <NuxtLink to="/about" aria-label="About me">
              {{ headerData.about[selectedlanguage as SupportedLanguage] }}
            </NuxtLink>
          </li>
        </ul>
        <li>
          <ClientOnly>
            <button
              v-if="colorMode.value === 'light'" name="light-mode" title="Light"
              class="hover:scale-110 transition-all ease-out hover:cursor-pointer" @click="onClick('dark')"
            >
              <Icon name="icon-park:moon" size="20" />
            </button>
            <button
              v-if="colorMode.value === 'dark'" name="dark-mode" title="Dark"
              class="hover:scale-110 transition-all ease-out hover:cursor-pointer" @click="onClick('light')"
            >
              <Icon name="noto:sun" size="20" />
            </button>
            <template #fallback>
              <!-- this will be rendered on server side -->
              <Icon name="svg-spinners:180-ring" size="20" />
            </template>
          </ClientOnly>
        </li>
        <li class="flex items-center">
          <!-- Ensure alignment -->
          <ClientOnly>
            <!-- Language switch -->
            <li class="flex items-center">
              <div
                class="relative inline-flex items-center rounded-full border dark:bg-slate-600 border-gray-300 bg-gray-200 w-16 h-8 cursor-pointer"
              >
                <div
                  :class="{
                    'bg-sky-700 transition-colors duration-300': selectedlanguage === 'en',
                    'bg-gray-200 dark:bg-slate-600': selectedlanguage === 'bn',
                  }" class="absolute left-0 top-0 h-full w-1/2 rounded-full flex items-center justify-center text-xs"
                  @click="toggleLanguage('en')"
                >
                  EN
                </div>
                <div
                  :class="{
                    'bg-sky-700 transition-colors duration-300': selectedlanguage === 'bn',
                    'bg-gray-200 dark:bg-slate-600': selectedlanguage === 'en',
                  }" class="absolute right-0 top-0 h-full w-1/2 rounded-full flex items-center justify-center text-xs"
                  @click="toggleLanguage('bn')"
                >
                  BN
                </div>
              </div>
            </li>
          </ClientOnly>
        </li>

        <!-- this div is for Hamburger menu -->
        <div class="sm:hidden relative">
          <button class="text-gray-600 focus:outline-none dark:text-white pt-2" @click="toggleMenu">
            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
          <div
            v-if="isMenuOpen"
            class="absolute top-full right-0 mt-2 w-32 dark:bg-blue-950 bg-white shadow-lg rounded-md overflow-hidden "
          >
            <ul class="p-2">
              <li title="Categories" :class="{ underline: path === 'categories' }">
                <NuxtLink to="/categories" aria-label="About me">
                  Category
                </NuxtLink>
              </li>
              <li title="About Us" :class="{ underline: path === 'about' }">
                <NuxtLink to="/about" aria-label="About me">
                  {{ headerData.about[selectedlanguage as SupportedLanguage] }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles if needed */
</style>
