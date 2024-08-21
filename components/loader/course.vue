<template>
  <div class="px-2 py-5 sm:py-9 max-w-6xl mt-10 mx-auto">
    <div class="flex justify-center mb-6">
      <div class="h-40 w-full bg-gray-300 animate-pulse" />
    </div>
    <div class="container mx-auto p-4 sm:grid sm:grid-cols-3 sm:gap-4">
      <div class="sm:col-span-2">
        <div class="mb-4">
          <div class="h-8 bg-gray-300 w-3/4 animate-pulse" />
        </div>
        <div class="mb-4">
          <div class="h-6 bg-gray-300 w-full animate-pulse" />
        </div>
        <br>
        <div class="flex justify-between">
          <div class="h-6 bg-gray-300 w-1/3 animate-pulse" />
          <div class="h-6 bg-gray-300 w-1/3 animate-pulse" />
        </div>
        <div class="flex justify-between mt-4">
          <div class="h-6 bg-gray-300 w-1/3 animate-pulse" />
          <div class="h-6 bg-gray-300 w-1/3 animate-pulse" />
        </div>
        <div class="h-6 bg-gray-300 w-1/4 animate-pulse mt-4" />
        <br>
        <p class="text-2xl font-bold mb-1" />
        <div v-for="i in 1" :key="i" class="flex items-center space-x-4 mb-4">
          <div class="h-20 w-20 rounded-full bg-gray-300 animate-pulse" />
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-300 w-1/2 animate-pulse" />
            <div class="h-4 bg-gray-300 w-1/4 animate-pulse" />
          </div>
        </div>
        <div>
          <b />
          <ul class=" list-inside">
            <li class="h-4 bg-gray-300 w-full animate-pulse" />
          </ul>
        </div>
        <div class="sm:hidden mt-4 border border-gray-300 h-96 overflow-y-auto">
          <p class="font-semibold text-center py-3" />
          <div v-for="i in 3" :key="i" class="flex justify-between items-center cursor-pointe border border-t-gray-300 border-b-gray-300 p-3">
            <div class="h-6 bg-gray-300 w-3/4 animate-pulse" />
          </div>
        </div>
      </div>

      <div class="hidden sm:block border border-gray-300 h-5/6 overflow-y-auto">
        <p class="font-semibold text-center py-3" />
        <div v-for="i in 3" :key="i" class="flex justify-between items-center cursor-pointe border border-t-gray-300 border-b-gray-300 p-3">
          <div class="h-6 bg-gray-300 w-3/4 animate-pulse" />
        </div>
      </div>
    </div>
  </div>
</template>
