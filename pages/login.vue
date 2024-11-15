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
  const runtimeConfig = useRuntimeConfig()
  const url = `${runtimeConfig.public.backendDomain}/api/signin`
  isFetching.value = true
  const { error, pending } = await useFetch(url, {
    method: 'post',
    body: {
      userName: username.value,
      password: password.value,
    },
    credentials: 'include',
  })
  isFetching.value = pending.value

  if (error.value) {
    toast.error(error.value?.data, { autoClose: 4000 })
  }
  else {
    toast.success('Successfully Logged In', { autoClose: 1000 })
    setTimeout(() => {
      router.push('/')
    }, 1000)
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
        <!--
        <div class="mt-6 grid grid-cols-3 items-center text-gray-400">
          <hr class="border-gray-600 dark:border-gray-700">
          <p class="text-center text-sm text-[#002D74] dark:text-gray-300">
            অথবা
          </p>
          <hr class="border-gray-600 dark:border-gray-700">
        </div>

        <button class="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
          <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
            <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
            <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
            <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
          </svg>
          Google দিয়ে লগইন করুন
        </button>
        -->

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
