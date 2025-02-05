<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useAppStore } from '~/stores/appStore.js'
import languages from '~/content/language.json'
import type { SignUp, SupportedLanguage } from '~/types/language'

const SignupData: SignUp = languages.signup
const appStore = useAppStore()
const selectedLanguage = useCookie<string>('language', { default: () => 'bn', path: '/' })

const email = ref('')
const password = ref('')
const phoneNumber = ref('')
const errorMessage = ref('')
const passwordVisible = ref(false)
const showErrorMessage = ref(false)
const isFetching = ref(false)

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneNumberRegex = /^01\d{9}$/

function toggleVisibility() {
  passwordVisible.value = !passwordVisible.value
}

async function handleSubmit() {
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Invalid email format'
    showErrorMessage.value = true
    return
  }

  if (phoneNumber.value && !phoneNumberRegex.test(phoneNumber.value)) {
    errorMessage.value = 'Invalid phone number format'
    showErrorMessage.value = true
    return
  }

  try {
    isFetching.value = true
    const response = await $fetch('https://praromvik-backend.vercel.app/api/auth/signup', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
        mobile: phoneNumber.value || null,
      },
    })

    toast.success('Successfully signed up', { autoClose: 2000 })
    navigateTo('/login')
  }
  catch (error: any) {
    toast.error(error.data?.message || 'Signup failed', { autoClose: 4000 })
  }
  finally {
    isFetching.value = false
  }
}
</script>

<template>
  <section class="dark:bg-gray-900 min-h-screen flex items-center justify-center">
    <div class="dark:bg-gray-800 flex rounded-2xl shadow-lg max-w-6xl p-5 items-center">
      <div class="w-full px-8">
        <h2 class="font-bold text-2xl text-[#002D74] dark:text-zinc-400">
          {{ SignupData.header[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
        </h2>
        <p class="text-s mt-4 text-[#002D74] dark:text-gray-300">
          {{ SignupData.starter[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
        </p>
        <p v-if="showErrorMessage" style="color: red;">
          Error: {{ errorMessage }}
        </p>
        <form class="flex flex-col gap-4">
          <input
            v-model="email"
            class="p-2 mt-8 rounded-xl border bg-white dark:bg-gray-600 text-[#002D74] dark:text-gray-300"
            type="email"
            placeholder="Email"
            required
          >
          <div class="relative">
            <input
              v-model="password"
              class="p-2 rounded-xl border w-full bg-white dark:bg-gray-600 text-[#002D74] dark:text-gray-300"
              :type="passwordVisible ? 'text' : 'password'"
              placeholder="Password"
              required
            >
            <Icon
              :name="passwordVisible ? 'mdi:eye' : 'mdi:eye-off'"
              color="black"
              class="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
              @click="toggleVisibility"
            />
          </div>
          <div class="relative">
            <input
              v-model="phoneNumber"
              class="p-2 rounded-xl border w-full bg-white dark:bg-gray-600 text-[#002D74] dark:text-gray-300"
              type="text"
              inputmode="numeric"
              pattern="[0-9]*"
              placeholder="Phone (Optional)"
            >
            <Icon name="mdi:phone" color="black" class="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer" />
          </div>
          <button type="submit" class="bg-sky-700 rounded-xl text-white py-2 hover:scale-105 duration-300" @click.prevent="handleSubmit">
            <span v-if="isFetching" class="flex items-center justify-center">
              <div class="spinner" />
            </span>
            <span v-else>
              {{ SignupData.signup[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
            </span>
          </button>
        </form>

        <div class="mt-3 text-xs flex justify-between items-center text-[#002D74] dark:text-gray-300">
          <p>{{ SignupData.hasAccount[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}</p>
          <NuxtLink to="/login" aria-label="লগইন" class="ml-2 mr-2">
            <button class="py-2 px-5 bg-white border text-[#002D74] rounded-xl hover:scale-110 duration-300">
              {{ SignupData.login[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
