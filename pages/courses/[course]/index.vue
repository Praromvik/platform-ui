<script setup lang="ts">
import { toast } from 'vue3-toastify'

import loader from '../../../components/loader/course'

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
  requirements: Array<string>
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
const courseObject: Ref<Course | null> = ref(null)
const Lessons: Ref<Array<Lesson> | null> = ref([])
const isfetchingCourse = ref(false)
const isfetchingLesson = ref(false)

const runtimeConfig = useRuntimeConfig()

async function getCourse() {
  isfetchingCourse.value = true
  try {
    const url = `${runtimeConfig.public.backendDomain}/api/course/${courseId}`

    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    if (!response.ok)
      throw new Error('Cannot fetch course info')

    const data = await response.json()
    courseObject.value = data
  }
  catch (e: any) {
    toast.error(e.message || 'An unexpected error occurred')
  }
  finally {
    isfetchingCourse.value = false
  }
}

async function getLesson() {
  isfetchingLesson.value = true
  try {
    const url = `${runtimeConfig.public.backendDomain}/api/course/${courseId}/lesson/list`
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    if (!response.ok)
      throw new Error('Cannot fetch course info')
    const data = await response.json()
    Lessons.value = data
  }
  catch (e: any) {
    toast.error(e.message || 'An unexpected error occurred')
  }
  finally {
    isfetchingLesson.value = false
  }
}

function setUnSetLessonId(_id: string) {
  if (selectedLesson.value === _id)
    selectedLesson.value = ''
  else selectedLesson.value = _id
}

getCourse()
getLesson()
</script>

<template>
  <div v-if="isfetchingCourse || isfetchingLesson">
    <loader />
  </div>
  <div v-else class="px-2 py-2 sm:py-9 max-w-6xl mt-10 mx-auto">
    <div class="flex justify-center mb-4">
      <div v-if="courseObject?.image">
        <img class="h-40 w-full" :src="courseObject?.image">
      </div>
      <div v-else class="h-40 w-full text-center text-5xl bg-slate-200">
        No Image
      </div>
    </div>
    <div class="container mx-auto p-4 sm:grid sm:grid-cols-3 sm:gap-4">
      <div class="sm:col-span-2">
        <div class="mb-4">
          <h1 class="text-3xl font-bold">
            {{ courseObject?.title || 'Default Title' }}
          </h1>
        </div>
        <div class="mb-4">
          {{ courseObject?.description || 'Default Description' }}
        </div>
        <br>
        <div class="flex justify-between">
          <div class="mb-2">
            <span class="font-bold mb-2">Rating:</span> {{ courseObject?.rating || '0.0' }} ⭐
          </div>
          <div class="mb-2">
            <span class="font-bold mb-2">Students Enrolled:</span> {{ courseObject?.students || '00' }}
          </div>
        </div>
        <div class="flex justify-between">
          <div class="mb-2">
            <span class="font-bold mb-2">Start Date:</span> {{ courseObject?.startDate || 'To be declared' }}
          </div>
          <div class="mb-2">
            <span class="font-bold mb-2">Duration:</span> {{ courseObject?.duration || '0' }} hours
          </div>
        </div>
        <div class="mb-2">
          <span class="font-bold mb-2">Price:</span>  {{ courseObject?.price || '0' }} tk
        </div>
        <br>
        <p class="text-2xl font-bold mb-1">
          Instructors
        </p>
        <div v-for="instructor in courseObject?.instructors" :key="instructor" class="flex items-center space-x-4 mb-4">
          <div>
            <img
              class="h-20 w-20 rounded-lg "
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__2IIAULCR-xberpmuxf-9Jx3cJZLJgLm4tSb9cDwRQ&s"
            >
          </div>
          <div>
            <p>Name : {{ instructor }}</p>
            <p>Company : Appscode</p>
          </div>
        </div>
        <div>
          <b>Requirements</b>
          <ul class="list-disc list-inside">
            <div v-if="courseObject?.requirements">
              <li v-for="require in courseObject?.requirements" :key="require">
                {{ require }}
              </li>
            </div>
            <div v-else>
              <li>
                No prerequisite
              </li>
            </div>
          </ul>
        </div>
        <div class="sm:hidden mt-4 border border-gray-300 h-96 overflow-y-auto">
          <p class="font-semibold text-center py-3">
            Module's List
          </p>
          <div v-for="lesson in Lessons" :key="lesson.title">
            <div
              class="flex justify-between items-center cursor-pointe  border border-t-gray-300 border-b-gray-300 p-3"
              @click="setUnSetLessonId(lesson._id)"
            >
              <div class="font-semibold">
                {{ lesson.title || 'Default Title' }}
              </div>
              <div>
                <Icon v-if="selectedLesson === lesson._id" name="ep:caret-bottom" size="1.5em" />
                <Icon v-else name="ep:caret-right" size="1.5em" />
              </div>
            </div>
            <div v-if="selectedLesson === lesson._id" class="border border-t-0 border-gray-300 h-auto overflow-y-auto">
              <div
                v-for="content in lesson.contents" :key="content"
                @click="router.push(`${courseId}/${lesson._id}/${content}`)"
              >
                <div class="flex items-center mb-2 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                    class="fill-current text-gray-600 ml-1"
                  >
                    <path
                      d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                    />
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
      <div class="hidden sm:block border border-gray-300 h-5/6 overflow-y-auto">
        <p class="font-semibold text-center py-3">
          Module's List
        </p>
        <div v-for="lesson in Lessons" :key="lesson.title">
          <div
            class="flex justify-between items-center cursor-pointe border border-t-gray-300 border-b-gray-300 p-3"
            @click="setUnSetLessonId(lesson._id)"
          >
            <div class="font-semibold">
              {{ lesson.title || 'Default Title' }}
            </div>
            <div>
              <Icon v-if="selectedLesson === lesson._id" name="ep:caret-bottom" size="1.5em" />
              <Icon v-else name="ep:caret-right" size="1.5em" />
            </div>
          </div>
          <div v-if="selectedLesson === lesson._id" class="border border-t-0 border-gray-300 p-3">
            <div
              v-for="content in lesson.contents" :key="content"
              @click="router.push(`${courseId}/${lesson._id}/${content}`)"
            >
              <div class="flex items-center mb-2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
                  class="fill-current text-gray-600"
                >
                  <path
                    d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                  />
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
