<script setup lang="ts">
defineOgImageComponent('About', {
  headline: 'Greetings 👋',
  title: 'Praromvik',
  description: 'Dive into web development with me and learn Js, Ts, Vue, Nuxt, Docker, k8s',
})
</script>

<template>
  <div class="py-5 mt-8">
    <div class="sm:grid grid-cols-8 px-6 py-5 sm:py-9 gap-5 container max-w-6xl  mx-auto">
      <div class="col-span-5  max-w-md">
        <div class="flex justify-between">
          <div>
            <h1 class="text-xl sm:text-4xl  pb-2 font-bold ">
              Praromvik
            </h1>

            <div class="my-3 space-x-2 md:space-x-3 pb-10">
              <NuxtLink
                to="https://discord.gg/uv2hQaCH"
                target="_blank"
                class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
                aria-label="Github"
              >
                <Icon name="ic:baseline-discord" size="1.5em" />
              </NuxtLink>
              <NuxtLink
                to="https://www.linkedin.com/company/praromvik/"
                target="_blank"
                class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
                aria-label="LinkedIn"
              >
                <Icon name="fa:linkedin-square" size="1.5em" />
              </NuxtLink>
              <NuxtLink
                to="https://twitter.com/PraromvikHq"
                target="_blank"
                class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
                aria-label="Twitter"
              >
                <Icon name="fa:twitter-square" size="1.5em" />
              </NuxtLink>
              <NuxtLink
                to="https://www.facebook.com/profile.php?id=61557462003505"
                target="_blank"
                class="px-2 py-1 lg:px-3 lg:py-2 bg-gray-300 text-gray-800 rounded-md dark:bg-slate-700 dark:text-[#F1F2F4]"
                aria-label="StackOverflow"
              >
                <Icon name="ri:facebook-fill" size="1.5em" />
              </NuxtLink>
            </div>
          </div>
          <div class="sm:hidden block col-span-3 pb-5 dark:text-[#F1F2F4]">
            <NuxtImg
              src="/logo.png"
              width="125"
              height="115"
              quality="50"
              class="rounded-md"
            />
          </div>
        </div>
        <h3 class="text-base sm:text-3xl font-semibold pb-7 sm:pb-12">
          Start Your DevOps Journey With US
        </h3>

        <p>Praromvik is a learning platform. We offer training on DevOps tools like docker, kubernetes, helm, prometheus and so on. Our platform is designed for newbies as well as the professionals, who want to dive into the amazing world of the cloud.</p>
      </div>
      <div class="hidden sm:block col-span-3">
        <NuxtImg
          src="/logo.png"
          width="450"
          height="500"
          quality="50"
          class="rounded-md"
        />
      </div>
    </div>
  </div>
</template>
