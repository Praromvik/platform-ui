<script setup lang="ts">
import { toast } from 'vue3-toastify'
import CourseCardLoader from '~/components/loader/courseCardLoader.vue'

interface COURSE {
  _id: string
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
}

const isFetching = ref(false)
const courseList = ref<Array<COURSE>>([])
const runtimeConfig = useRuntimeConfig()

async function getCourseList() {
  isFetching.value = true
  const url = `${runtimeConfig.public.backendDomain}/api/course/list`
  try {
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
    })
    const data = await response.json()
    courseList.value = data
  }
  catch (e) {
    toast.error('Cannot fetch Courses List')
  }
  isFetching.value = false
}
onMounted(() => {
  getCourseList()
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 rounded-lg space-y-8">
    <div v-if="isFetching" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <CourseCardLoader />
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      <CourseCard
        v-for="course in courseList" :key="course._id"
        :title="course.title"
        :description="course.description"
        :instructor="course.instructor"
        :alt="course.alt"
        :image="course.image"
        :moderators="course.moderators"
        :path="`/courses/${course._id}`"
        @click.prevent=""
      />
    </div>
  </div>
</template>
