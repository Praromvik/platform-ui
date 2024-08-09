<template>
  <div class="px-2 py-5 sm:py-9 max-w-6xl mt-10 mx-auto">
    <div class="flex justify-center mb-6">
      <div class="h-40 w-full bg-gray-300 animate-pulse" />
    </div>
    <div class="container mx-auto p-4 sm:grid sm:grid-cols-3 sm:gap-4">
      <div class="sm:col-span-2">
        <div class="mb-4">
          <div class="h-8 w-3/4 bg-gray-300 animate-pulse" />
        </div>
        <div class="mb-4">
          <div class="h-6 w-full bg-gray-300 animate-pulse" />
          <div class="h-6 w-5/6 bg-gray-300 animate-pulse mt-2" />
        </div>
        <br>
        <div class="flex justify-between">
          <div class="h-6 w-32 bg-gray-300 animate-pulse" />
          <div class="h-6 w-40 bg-gray-300 animate-pulse" />
        </div>
        <div class="flex justify-between mt-4">
          <div class="h-6 w-32 bg-gray-300 animate-pulse" />
          <div class="h-6 w-40 bg-gray-300 animate-pulse" />
        </div>
        <div class="h-6 w-20 bg-gray-300 animate-pulse mt-4" />
        <br>
        <p class="text-2xl font-bold mb-1">
          Instructors
        </p>
        <div class="flex items-center space-x-4 mb-4">
          <div class="h-20 w-20 rounded-full bg-gray-300 animate-pulse" />
          <div>
            <div class="h-4 w-32 bg-gray-300 animate-pulse" />
            <div class="h-4 w-24 bg-gray-300 animate-pulse mt-2" />
          </div>
        </div>
        <p class="text-xl font-bold mb-1">
          Moderators
        </p>
        <div class="flex items-center space-x-4 mb-4">
          <div class="h-10 w-10 rounded-full bg-gray-300 animate-pulse" />
          <div>
            <div class="h-4 w-32 bg-gray-300 animate-pulse" />
            <div class="h-4 w-24 bg-gray-300 animate-pulse mt-2" />
          </div>
        </div>
        <div class="mt-4">
          <b>Requirements</b>
          <ul class="list-disc list-inside space-y-2">
            <li class="h-4 w-full bg-gray-300 animate-pulse" />
            <li class="h-4 w-5/6 bg-gray-300 animate-pulse" />
            <li class="h-4 w-3/4 bg-gray-300 animate-pulse" />
            <li class="h-4 w-2/3 bg-gray-300 animate-pulse" />
            <li class="h-4 w-full bg-gray-300 animate-pulse" />
          </ul>
        </div>
      </div>

      <div class="hidden sm:block border border-gray-300 h-5/6 overflow-y-auto">
        <p class="font-semibold text-center py-3">
          Module's List
        </p>
        <div>
          <div class="h-6 w-1/2 bg-gray-300 animate-pulse mx-auto" />
          <div class="h-36 w-full bg-gray-300 animate-pulse mt-2" />
        </div>
      </div>
    </div>
  </div>
</template>
