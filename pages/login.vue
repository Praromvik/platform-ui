<script setup lang="ts">
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import { useAppStore } from '~/stores/appStore.js'
import languages from '~/content/language.json'
import type { Login, SupportedLanguage } from '~/types/language'

const LoginData: Login = languages.login

const selectedLanguage = useCookie<string>('language', {
  default: () => 'bn',
  path: '/',
})

const appStore = useAppStore()

const password = ref('')
const username = ref('')
const isFetching = ref(false)
const router = useRouter()
const passwordVisible = ref(false)

function toggleVisibility() {
  passwordVisible.value = !passwordVisible.value
}

async function handleLogin() {
  try {
    isFetching.value = true
    const response = await $fetch<{ token: string; email: string }>('https://praromvik-backend.vercel.app/api/auth/signin', {
      method: 'POST',
      body: {
        email: username.value,
        password: password.value,
      },
    })

    localStorage.setItem('token', response.token)
    localStorage.setItem('email', response.email)
    toast.success('Successfully logged in', { autoClose: 1000 })
    router.push('/dashboard')
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
    <div class="dark:bg-gray-800 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
      <div class="md:w-1/2 px-8 md:px-16">
        <h2 class="font-bold text-2xl text-[#002D74] dark:text-zinc-400">
          {{ LoginData.login[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
        </h2>
        <p class="text-xs mt-4 text-[#002D74] dark:text-gray-300">
          {{ LoginData.header[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
        </p>

        <form action="" class="flex flex-col gap-4">
          <input v-model="username" class="p-2 mt-8 rounded-xl border bg-white dark:bg-gray-600 text-[#002D74] dark:text-gray-300" type="text" name="username" placeholder="username">
          <div class="relative">
            <input v-model="password" class="p-2 rounded-xl border w-full bg-white dark:bg-gray-600 text-[#002D74] dark:text-gray-300" :type="passwordVisible ? 'text' : 'password'" name="password" placeholder="Password">
            <Icon :name="passwordVisible ? 'mdi:eye' : 'mdi:eye-off'" color="black" class="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer" @click="toggleVisibility()" />
          </div>
          <button class="bg-sky-700 rounded-xl text-white py-2 hover:scale-105 duration-300 relative" @click.prevent="handleLogin">
            <span v-if="isFetching" class="flex items-center justify-center">
              <div class="spinner" />

            </span>
            <span v-else>
              {{ LoginData.loginButton[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
            </span>
          </button>
        </form>

        <div class="mt-5 text-xs border-b border-white dark:border-gray-600 py-4 text-[#002D74] dark:text-gray-300">
          <a href="#">{{ LoginData.forgetPassword[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}</a>
        </div>

        <div class="mt-3 text-xs flex justify-between items-center text-[#002D74] dark:text-gray-300">
          <p>{{ LoginData.noAccount[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}</p>
          <NuxtLink to="/signup" aria-label="লগইন" class="ml-2 mr-2">
            <button class="py-2 px-5 bg-white border text-[#002D74] rounded-xl hover:scale-110 duration-300">
              {{ LoginData.signup[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
            </button>
          </NuxtLink>
        </div>
      </div>

      <div class="md:block hidden w-1/2">
        <img class="rounded-2xl" src="~/assets/images/login.jpg">
      </div>
    </div>
  </section>
</template>
