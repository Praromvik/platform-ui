<script setup lang="ts">
import { toast } from 'vue3-toastify'

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
const ifContentHidden = ref(false)
const runtimeConfig = useRuntimeConfig()

function prevNextButton(idx: number) {
  const prevNextContent = selectedLesson.value?.contents[idx]
  router.push(`${prevNextContent}`)
}

async function getContent() {
  try {
    const url = `${runtimeConfig.public.backendDomain}/api/course/${courseName}/content/${contentName}`
    const { data, error } = await useFetch<Content>(url, {
      method: 'GET',
      credentials: 'include',
    })
    if (error.value)
      toast.error('Cannot fetch course info')

    else
      selectedContent.value = data.value
  }
  catch (e) {
    toast.error('An unexpected error occurred')
  }
}
async function getContentList() {
  try {
    const url = `${runtimeConfig.public.backendDomain}/api/course/${courseName}/lesson/${lessonName}`
    const { data, error } = await useFetch<Lesson>(url, {
      method: 'GET',
      credentials: 'include',
    })
    if (error.value) {
      toast.error('Cannot fetch course info')
    }
    else {
      selectedLesson.value = data.value || {
        _id: '',
        title: '',
        contents: [],
      }
    }
  }
  catch (e) {
    toast.error('An unexpected error occurred')
  }
}

onMounted(() => {
  getContentList()
  getContent()
})
</script>

<template>
  <div class="sm:grid grid-cols-8 px-2 py-5 sm:py-9 gap-5 container max-w-6xl mt-10 mx-auto">
    <div class="sm:col-span-6">
      <iframe
        class="w-full h-96"
        :src="selectedContent.data"
        :title="selectedContent.title"
        frameborder="0"
        allowfullscreen
      />
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
            Table Of Content
          </div>
          <div>
            <Icon v-if="!ifContentHidden" name="ep:caret-bottom" size="1.5em" />
            <Icon v-else name="ep:caret-right" size="1.5em" />
          </div>
        </div>
        <div v-if="!ifContentHidden" class="border border-t-0 border-gray-300 rounded-b-lg h-36 overflow-y-auto">
          <div v-for="content in selectedLesson.contents" :key="content" @click="router.push(`${content}`)">
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
        {{ selectedContent?.title }}
      </p>
      <hr>
      <p>{{ selectedContent?.description }}</p>
    </div>
    <div class="hidden sm:block sm:col-span-2">
      <div class="flex justify-between items-center cursor-pointe border border-gray-300 rounded-t-lg p-3">
        <div class="font-semibold">
          Table Of Content
        </div>
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
