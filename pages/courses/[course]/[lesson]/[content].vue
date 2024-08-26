<script setup lang="ts">
import { toast } from 'vue3-toastify'
import loader from '../../../../components/loader/content'

interface Lesson {
  _id: string
  title: string
  contents: Array<string>
}
interface Content {
  _id: string
  title: string
  type: string
  description: string
  data: string
}

const route = useRoute()
const router = useRouter()
const courseName = route.params.course
const lessonName = route.params.lesson
const contentName = route.params.content
const selectedLesson = ref<Lesson>({
  _id: '',
  title: '',
  contents: [],
})
const selectedContent = ref<Content | null>(null)
const contentIndex = ref(0)
const activeTab = ref('description')
const ifContentHidden = ref(false)
const runtimeConfig = useRuntimeConfig()
const isContentFetching = ref(false)
const isLessionFetching = ref(false)
function prevNextButton(idx: number) {
  const prevNextContent = selectedLesson.value?.contents[idx]
  router.push(`${prevNextContent}`)
}

async function getContent() {
  isContentFetching.value = true
  try {
    const url = `${runtimeConfig.public.backendDomain}/api/course/${courseName}/content/${contentName}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    if (!response.ok)
      throw new Error('Cannot fetch course info')

    const data = await response.json()
    selectedContent.value = data
  }
  catch (e: any) {
    toast.error(e.message || 'An unexpected error occurred')
  }
  finally {
    isContentFetching.value = false
  }
}
async function getContentList() {
  isLessionFetching.value = true
  try {
    const url = `${runtimeConfig.public.backendDomain}/api/course/${courseName}/lesson/${lessonName}`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    if (!response.ok)
      throw new Error('Cannot fetch course info')

    const data = await response.json()
    selectedLesson.value = data
    selectedLesson.value.contents.forEach((element: string, idx: number) => {
      if (element === contentName)
        contentIndex.value = idx
    })
  }

  catch (e: any) {
    toast.error(e.message || 'An unexpected error occurred')
  }
  finally {
    isLessionFetching.value = false
  }
}

onMounted(() => {
  getContentList()
  getContent()
})
</script>

<template>
  <div v-if="isLessionFetching || isContentFetching">
    <loader />
  </div>
  <div v-else class="sm:grid grid-cols-8 px-2 py-5 sm:py-9 gap-5 container max-w-6xl mt-10 mx-auto">
    <div class="sm:col-span-6">
      <div v-if="selectedContent?.data">
        <iframe
          class="w-full h-96"
          :src="selectedContent?.data"
          :title="selectedContent?.title"
          frameborder="0"
          allowfullscreen
        />
      </div>
      <div v-else class="w-full h-80 text-center text-5xl bg-slate-200">
        No Media
      </div>
      <div class="flex justify-between sm:mb-10 mb-6">
        <button
          :disabled="contentIndex === 0"
          :class="{
            'bg-blue-500 text-white font-semibold py-1 px-2 mt-1 rounded hover:bg-blue-600': contentIndex !== 0,
            'bg-gray-300 text-gray-500 py-1 px-2 mt-1 rounded cursor-not-allowed opacity-50': contentIndex === 0,
          }"
          @click="prevNextButton(contentIndex - 1)"
        >
          Previous
        </button>

        <button
          :disabled="contentIndex === selectedLesson.contents.length - 1"
          :class="{
            'bg-blue-500 text-white font-semibold py-1 px-2 mt-1 rounded hover:bg-blue-600': contentIndex !== selectedLesson.contents.length - 1,
            'bg-gray-300 text-gray-500 py-1 px-2 mt-1 rounded cursor-not-allowed opacity-50': contentIndex === selectedLesson.contents.length - 1,
          }"
          @click="prevNextButton(contentIndex + 1)"
        >
          Next
        </button>
      </div>
      <div class="sm:hidden sm:col-span-2">
        <div class="flex justify-between items-center cursor-pointe border border-gray-300 rounded-t-lg p-3" @click="ifContentHidden = !ifContentHidden">
          <div class="font-semibold">
            {{ selectedLesson?.title || 'Table Of Content' }}
          </div>
          <div>
            <Icon v-if="!ifContentHidden" name="ep:caret-bottom" size="1.5em" />
            <Icon v-else name="ep:caret-right" size="1.5em" />
          </div>
        </div>
        <div v-if="!ifContentHidden" class="border border-t-0 border-gray-300 rounded-b-lg h-36 overflow-y-auto">
          <div v-for="content in selectedLesson?.contents" :key="content" @click="router.push(`${content}`)">
            <div :class="`flex items-center ${content === contentName ? 'bg-slate-300' : ''} p-2`">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="fill-current text-gray-600">
                <path d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
              </svg>
              <div class="ml-2">
                <p>{{ content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="font-bold text-5xl mt-2">
        {{ selectedContent?.title || 'Default Title' }}
      </p>
      <!-- Tabs -->
      <div class="flex border-b border-gray-300 dark:border-gray-700 mt-2">
        <button
          class="flex-1 text-center py-3 px-4 cursor-pointer transition-all" :class="[
            activeTab === 'description' ? 'bg-blue-500 text-white dark:bg-blue-600 dark:border-blue-800'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
          ]"
          @click="activeTab = 'description'"
        >
          Description
        </button>

        <button
          class="flex-1 text-center py-3 px-4 cursor-pointer transition-all" :class="[
            activeTab === 'quiz' ? 'bg-blue-500 text-white dark:bg-blue-600 dark:border-blue-800'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
          ]"
          @click="activeTab = 'quiz'"
        >
          Quiz
        </button>
        <button
          class="flex-1 text-center py-3 px-4 cursor-pointer transition-all" :class="[
            activeTab === 'assignment' ? 'bg-blue-500 text-white dark:bg-blue-600 dark:border-blue-800'
            : 'bg-gray-200 text-gray-600 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700',
          ]"
          @click="activeTab = 'assignment'"
        >
          Assignment
        </button>
      </div>
      <div class="mt-2 p-4  border rounded shadow dark:bg-gray-900 dark:border-gray-700">
        <div v-if="activeTab === 'description'">
          {{ selectedContent?.description || 'Default Description' }}
        </div>
        <div v-if="activeTab === 'quiz'">
          Quiz
        </div>
        <div v-if="activeTab === 'assignment'">
          Assignment
        </div>
      </div>
    </div>
    <div class="hidden sm:block sm:col-span-2">
      <div class="flex justify-between items-center cursor-pointe border border-gray-300 rounded-t-lg p-3">
        <p class="font-semibold">
          {{ selectedLesson?.title || 'Table Of Content' }}
        </p>
        <hr>
      </div>
      <div class="border border-t-0 border-gray-300 rounded-b-lg">
        <div v-for="content in selectedLesson?.contents" :key="content" @click="router.push(`${content}`)">
          <div :class="`flex items-center ${content === contentName ? 'bg-slate-300' : ''} p-2`">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="fill-current text-gray-600">
              <path d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
            </svg>
            <div class="ml-2">
              <p>{{ content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
