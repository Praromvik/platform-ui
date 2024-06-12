<script setup lang="ts">
import { onMounted, ref } from 'vue'
import CountUp from 'vue-countup-v3'
import { useAppStore } from '~/stores/appStore.js'
import languages from '~/content/language.json'
import type { Hero, SupportedLanguage } from '~/types/language'

const HeroData: Hero = languages.hero

const appStore = useAppStore()

const selectedLanguage = useCookie<string>('language', {
  default: () => 'bn',
  path: '/',
})

// References for countup elements
const courseCount = ref<number>(0)
const studentCount = ref<number>(0)
const visitorCount = ref<number>(0)

// Function to simulate fetching data and updating counts
function fetchDataAndUpdateCounts() {
  // Simulated data, you can replace this with actual data fetching logic
  const numberOfCourses = 50
  const numberOfStudents = 1000
  const numberOfVisitors = 50000

  // Update counts
  courseCount.value = numberOfCourses
  studentCount.value = numberOfStudents
  visitorCount.value = numberOfVisitors
}

// Fetch data and update counts on component mount
onMounted(() => {
  fetchDataAndUpdateCounts()
})
</script>

<template>
  <div class="container mx-auto mt-8">
    <div class="grid grid-cols-1 sm:grid-cols-2 items-center">
      <div class="px-6">
        <h1 class="text-black dark:text-zinc-300 font-semibold leading-tight text-4xl md:text-6xl my-5">
          {{ HeroData.welcome[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
        </h1>
        <p class="dark:text-zinc-300">
          {{ HeroData.moto[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
        </p>
        <ClientOnly>
          <div class="mt-4">
            <p class="dark:text-zinc-300">
              {{ HeroData.hours[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
              <span class="primaryColor  flex font-bold text-lg md:text-xl">
                <CountUp :end-val="courseCount" />+
              </span>
            </p>
            <p class="dark:text-zinc-300">
              {{ HeroData.students[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
              <span class="primaryColor flex font-bold text-lg md:text-xl">
                <CountUp :end-val="studentCount" />+
              </span>
            </p>
          </div>
        </ClientOnly>
      </div>

      <img src="../../assets/images/coding.svg">
    </div>
  </div>
</template>
