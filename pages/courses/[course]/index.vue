<script setup lang="ts">
import axios from 'axios'
import { toast } from 'vue3-toastify'

interface Course {
  title: string
  description: string
  instructors: Array<string>
  moderators: Array<string>
  startDate: string
  endDate: string
  duration: number
  capacity: number
  students: number
  price: number
  image: string
  rating: number
}
interface Lesson {
  _id: string
  title: string
  contents: Array<string>
}
const router = useRouter()
const route = useRoute()
const courseId = route.params.course
const selectedLesson = ref('')
const courseObject: Ref<Course> = ref({
  title: 'Go: The Complete Developer\'s Guide (Golang)',
  description: 'Master the fundamentals and advanced features of the Go Programming Language (Golang)',
  instructors: [
    'sayedtahsin',
  ],
  moderators: [],
  startDate: '15th August',
  endDate: '',
  duration: 3,
  capacity: 0,
  students: 0,
  price: 10000,
  rating: 4.6,
  image: 'https://miro.medium.com/v2/resize:fit:1024/1*V8JWIC-tqYQkS1b1edsu3w.png',
})
const isfetchingCourse = ref(false)
const isfetchingLesson = ref(false)
const Lessons: Ref<Array<Lesson>> = ref([
  {
    _id: 'introduction',
    title: 'Introduction',
    contents: [
      'course-introduction',
      'refresher-lab-01',
    ],
  },
  {
    _id: 'concurrency',
    title: 'Concurrency',
    contents: [
      'course-introduction',
      'refresher-lab-01',
    ],
  },
])

async function getCourse() {
  isfetchingCourse.value = true
  try {
    const url = `http://localhost:3030/course/${courseId}`
    const resp = await axios.get(url)
    courseObject.value = resp.data
  }
  catch (e) {
    toast.error('Cannot fetch course Info')
  }
  isfetchingCourse.value = false
}
async function getLesson() {
  isfetchingLesson.value = true
  try {
    const url = `http://localhost:3030/course/${courseId}/lesson/list`
    const resp = await axios.get(url)
    Lessons.value = resp.data
  }
  catch (e) {
    toast.error('Cannot fetch course Info')
  }
  isfetchingLesson.value = false
}

onMounted(() => {
  getCourse()
  getLesson()
})
</script>

<template>
  <div class="px-2 py-5 sm:py-9 max-w-6xl mt-10 mx-auto">
    <div class="flex justify-center mb-6">
      <img class="h-40 w-full" :src="courseObject?.image">
    </div>
    <div class="container mx-auto p-4 sm:grid sm:grid-cols-3 sm:gap-4">
      <div class="sm:col-span-2">
        <div class="mb-4">
          <h1 class="text-3xl font-bold">
            {{ courseObject?.title }}
          </h1>
        </div>
        <div class="mb-4">
          {{ courseObject?.description }}
        </div>
        <br>
        <div class="flex justify-between">
          <div class="font-bold mb-2">
            Rating: {{ courseObject?.rating }} ⭐
          </div>
          <div class="font-bold mb-4">
            Students Enrolled: {{ courseObject?.students }}
          </div>
        </div>
        <div class="flex justify-between">
          <div class="font-bold mb-2">
            Start Date: {{ courseObject?.startDate }}
          </div>
          <div class="font-bold mb-4">
            Duration: {{ courseObject?.duration }} hours
          </div>
        </div>
        <div class="font-bold mb-2">
          Price: {{ courseObject?.price }} tk
        </div>
        <br>
        <p class="text-2xl font-bold mb-1">
          Instructors
        </p>
        <div v-for="instructor in courseObject?.instructors" :key="instructor" class="flex items-center space-x-4 mb-4">
          <div>
            <img class="h-20 w-20 rounded-full border-2 border-gray-500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__2IIAULCR-xberpmuxf-9Jx3cJZLJgLm4tSb9cDwRQ&s">
          </div>
          <div>
            <p>Name : {{ instructor }}</p>
            <p>Company : Appscode</p>
          </div>
        </div>
        <p class="text-xl font-bold mb-1">
          Moderators
        </p>
        <div v-for="instructor in courseObject?.instructors" :key="instructor" class="flex items-center space-x-4 mb-4">
          <div>
            <img class="h-10 w-10 rounded-full border-2 border-gray-500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__2IIAULCR-xberpmuxf-9Jx3cJZLJgLm4tSb9cDwRQ&s">
          </div>
          <div class="text-xs">
            <p>Name : {{ instructor }}</p>
            <p>Company : Appscode</p>
          </div>
        </div>
        <div>
          <b>Requirements</b>
          <ul class="list-disc list-inside">
            <li>
              No paid software required - Just install your favorite text editor and browser!
            </li>
            <li>
              Understand terminal basics including Linux shells, SSH, and package mangers.
            </li>
            <li>
              Know the basics of creating a server in the cloud (on any provider).
            </li>
            <li>
              Understand the basics of web and database servers. (communicate, IP's, ports, etc.)
            </li>
            <li>
              Know the basics of git and GitHub for accessing course materials.
            </li>
          </ul>
        </div>
        <div class="sm:hidden mt-4 border border-gray-300 h-96 overflow-y-auto">
          <p class="font-semibold text-center py-3">
            Module's List
          </p>
          <div>
            <div class="flex justify-between items-center cursor-pointe  border border-t-gray-300 border-b-gray-300 p-3" @click="ifContentHidden = !ifContentHidden">
              <div class="font-semibold">
                Module 1
              </div>
              <div>
                <Icon v-if="!ifContentHidden" name="ep:caret-bottom" size="1.5em" />
                <Icon v-else name="ep:caret-right" size="1.5em" />
              </div>
            </div>
            <div v-if="!ifContentHidden" class="border border-t-0 border-gray-300 h-36 overflow-y-auto">
              <div v-for="lesson in Lessons" :key="lesson.title" @click="router.push(`${courseId}/${lesson.title}`)">
                <div class="flex items-center mb-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="fill-current text-gray-600">
                    <path d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                  </svg>
                  <div class="ml-2">
                    <p>{{ lesson.title }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden sm:block border border-gray-300 h-5/6 overflow-y-auto">
        <p class="font-semibold text-center py-3">
          Module's List
        </p>
        <div v-for="lesson in Lessons" :key="lesson.title">
          <div class="flex justify-between items-center cursor-pointe border border-t-gray-300 border-b-gray-300 p-3" @click="selectedLesson = lesson._id">
            <div class="font-semibold">
              {{ lesson.title }}
            </div>
            <div>
              <Icon v-if="selectedLesson === lesson._id" name="ep:caret-bottom" size="1.5em" />
              <Icon v-else name="ep:caret-right" size="1.5em" />
            </div>
          </div>
          <div v-if="selectedLesson === lesson._id" class="border border-t-0 border-gray-300 p-3">
            <div v-for="content in lesson.contents" :key="content" @click="router.push(`${courseId}/${lesson._id}/${content}`)">
              <div class="flex items-center mb-2 cursor-pointer">
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
    </div>
  </div>
</template>
