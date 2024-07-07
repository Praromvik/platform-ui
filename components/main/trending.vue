<script lang="ts" setup>
import { useRouter } from '#vue-router';
// Get Last 6 Publish Post from the content/blog directory
const { data } = await useAsyncData('trending-post', () =>
  queryContent('/blogs').limit(3).sort({ _id: 1 }).find(),
)
const router=useRouter()

const formattedData = computed(() => {
  return data.value?.map((articles) => {
    return {
      path: articles._path,
      title: articles.title || 'no-title available',
      description: articles.description || 'no-description available',
      image: articles.image || '/not-found.jpg',
      alt: articles.alt || 'no alter data available',
      ogImage: articles.ogImage || '/not-found.jpg',
      date: articles.date || 'not-date-available',
      tags: articles.tags || [],
      published: articles.published || false,
    }
  })
})

useHead({
  title: 'Home',
  meta: [
    {
      name: 'description',
      content:
        'Learn about all the new tech like k8s , nuxt , aws , azure , docker etc',
    },
  ],
  titleTemplate: 'Praromvik',
})
function gotoBlogs(){
  router.push('/blogs')
}
</script>

<template>
  <div class="px-4">
    <div class="flex flex-row items-center space-x-3 pt-5 pb-3">
      <Icon name="mdi:star-three-points-outline" size="2em" class="text-black dark:text-zinc-300  " />
     <div class="flex ">
      <h2 class="text-4xl font-semibold text-black dark:text-zinc-300  ">
        Blog Posts
      </h2>
    </div> 

    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <BlogCard
        v-for="post in formattedData"
        :key="post.title"
        :path="post.path"
        :title="post.title"
        :date="post.date"
        :description="post.description"
        :image="post.image"
        :alt="post.alt"
        :og-image="post.ogImage"
        :tags="post.tags"
        :published="post.published"
      />
      <template v-if="data?.length === 0">
        <BlogEmpty />
      </template>
    </div>
    <div class="flex justify-end mt-3">
  <button @click="gotoBlogs" class="block text-center w-full bg-sky-700 p-2 rounded-lg text-[#F1F2F4]  mt-3 text-sm">
    All Blogs
  </button>
</div>
  </div>
</template>
