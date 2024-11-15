<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const phoneNumber = ref('')
const errorMessage = ref('')

const passwordVisible = ref(false)
const confirmPasswordVisible = ref(false)
const showErrorMessage = ref(false)
const isFetching = ref(false)

function toggleVisibility(inputId: string) {
  if (inputId === 'password')
    passwordVisible.value = !passwordVisible.value
  else if (inputId === 'confirmPassword')
    confirmPasswordVisible.value = !confirmPasswordVisible.value
}

async function handleSubmit() {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Password mismatched'
    showErrorMessage.value = true
    return
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorMessage.value = 'Invalid email format'
    showErrorMessage.value = true
    return
  }

  const phoneNumberRegex = /^01\d{9}$/
  if (!phoneNumberRegex.test(phoneNumber.value)) {
    errorMessage.value = 'Invalid phone number format.'
    showErrorMessage.value = true
    return
  }

  const url = 'http://localhost:8080/signup'
  isFetching.value = true
  const { error, pending } = await useFetch(url, {
    method: 'post',
    body: {
      userName: username.value,
      email: email.value,
      password: password.value,
      phone: phoneNumber.value,
    },
  })
  isFetching.value = pending.value

  if (error.value) {
    toast.error(error.value?.data, { autoClose: 4000 })
    navigateTo('/signup')
  }
  else {
    toast.success('Successfully Signed Up', { autoClose: 2000 })
    navigateTo('/')
  }
}
</script>

<template>
  <!-- লগইন কন্টেনার -->
  <div class="dark:bg-gray-800 flex rounded-2xl shadow-lg max-w-6xl p-5 items-center">
    <!-- ফর্ম -->
    <div class="w-full px-8">
      <h2 class="font-bold text-2xl text-[#002D74] dark:text-zinc-400">
        Update Your Information
      </h2>

      <p v-if="showErrorMessage" style="color: red;">
        Error: {{ errorMessage }}
      </p>
      <form class="flex flex-col gap-4">
        <input v-model="username" class="p-2 mt-8 rounded-xl border bg-white dark:bg-gray-600 text-[#002D74] dark:text-gray-300" type="text" name="username" placeholder="Name">
        <input v-model="email" class="p-2 rounded-xl border bg-white dark:bg-gray-600 text-[#002D74] dark:text-gray-300" type="email" name="email" placeholder="Email">
        <div class="relative">
          <input v-model="password" class="p-2 rounded-xl border w-full bg-white dark:bg-gray-600 text-[#002D74] dark:text-gray-300" :type="passwordVisible ? 'text' : 'password'" name="password" placeholder="Password">
          <Icon :name="passwordVisible ? 'mdi:eye' : 'mdi:eye-off'" color="black" class="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer" @click="toggleVisibility('password')" />
        </div>
        <div class="relative">
          <input v-model="confirmPassword" class="p-2 rounded-xl border w-full bg-white dark:bg-gray-600 text-[#002D74] dark:text-gray-300" :type="confirmPasswordVisible ? 'text' : 'password'" name="confirmPassword" placeholder="Confirm Password">
          <Icon :name="confirmPasswordVisible ? 'mdi:eye' : 'mdi:eye-off'" color="black" class="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer" @click="toggleVisibility('confirmPassword')" />
        </div>
        <div class="relative">
          <input v-model="phoneNumber" class="p-2 rounded-xl border w-full bg-white dark:bg-gray-600 text-[#002D74] dark:text-gray-300" type="text" inputmode="numeric" pattern="[0-9]*" name="phoneNumber" placeholder="Phone">
          <Icon name="mdi:phone" color="black" class="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer" />
        </div>
        <button type="submit" class="bg-sky-700 rounded-xl text-white py-2 hover:scale-105 duration-300" @click.prevent="handleSubmit">
          <span v-if="isFetching" class="flex items-center justify-center">
            <div class="spinner" />
          </span>
          <span v-else>
            Update
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
          {{ SignupData.googleSignup[selectedLanguage ? selectedLanguage as SupportedLanguage : appStore.language as SupportedLanguage] }}
        </button>
        -->
    </div>
  </div>
</template>
