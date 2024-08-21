<template>
  <div class="sm:grid grid-cols-8 px-2 py-5 sm:py-9 gap-5 container max-w-6xl mt-10 mx-auto">
    <div class="sm:col-span-6">
      <!-- Skeleton Loader for Iframe -->
      <div class="w-full h-96 bg-gray-300 animate-pulse" />

      <!-- Skeleton Loader for Hidden Content Table -->
      <div class="sm:hidden sm:col-span-2">
        <div class="w-full h-10 bg-gray-300 animate-pulse rounded" />
        <div class="mt-2 w-full h-36 bg-gray-300 animate-pulse rounded" />
      </div>

      <!-- Skeleton Loader for Title and Description -->
      <div>
        <div class="w-3/4 h-12 bg-gray-300 animate-pulse mt-2 rounded" />
        <div class="w-full h-4 bg-gray-300 animate-pulse mt-2 rounded" />
        <div class="w-full h-4 bg-gray-300 animate-pulse mt-2 rounded" />
        <div class="w-full h-4 bg-gray-300 animate-pulse mt-2 rounded" />
        <div class="w-full h-4 bg-gray-300 animate-pulse mt-2 rounded" />
      </div>
    </div>

    <!-- Skeleton Loader for Sidebar Content Table -->
    <div class="hidden sm:block sm:col-span-2">
      <div class="w-full h-10 bg-gray-300 animate-pulse rounded" />
      <div class="mt-2 w-full h-96 bg-gray-300 animate-pulse rounded" />
    </div>
  </div>
</template>
