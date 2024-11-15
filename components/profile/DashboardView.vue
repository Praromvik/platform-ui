<script setup lang="ts">
import CountUp from 'vue-countup-v3'
import userCourse from '~/components/course/userCourse.vue'
import { useRoute } from '#vue-router'

const route = useRoute()

const quotes = [
  'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
  'Believe you can and you\'re halfway there. - Theodore Roosevelt',
  'The only way to do great work is to love what you do. - Steve Jobs',
  'The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt',
  'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
  'It does not matter how slowly you go as long as you do not stop. - Confucius',
  'Your limitation—it\'s only your imagination.',
  'Push yourself, because no one else is going to do it for you.',
]

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
</script>

<template>
  <div>
    <h1>Welcome, {{ route.params.user }}</h1>

    <ClientOnly>
      <div class="mt-4">
        <p class="dark:text-zinc-300">
          Number of Hours Spent:
          <span class="primaryColor flex font-bold text-lg md:text-xl">
            <CountUp :end-val="12" />
          </span>
        </p>
        <p class="dark:text-zinc-300">
          Number of Money Spent:
          <span class="primaryColor flex font-bold text-lg md:text-xl">
            <CountUp :end-val="21000" />
          </span>
        </p>
        <p class="dark:text-zinc-300">
          Cost Per Hour:
          <span class="primaryColor flex font-bold text-lg md:text-xl">
            {{ (21000 / 12).toFixed(2) }}BDT/hour
          </span>
        </p>
        <p class="dark:text-zinc-300 mt-4">
          <em>"{{ randomQuote }}"</em>
        </p>
      </div>
    </ClientOnly>
  </div>
</template>
