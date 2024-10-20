<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const course = ref({
  title: '',
  description: '',
  _id: '',
  start_date: '',
  students: 0,
  image: '',
  requirements: [''],
  instructors: [
    {
      name: '',
      bio: '',
      image: '',
    },
  ],
  lessons: [
    {
      _id: '',
      title: '',
      contents: [
        {
          _id: '',
          courseRef: '',
          lessonRef: '',
          title: '',
          url: '',
          description: '',
        },
      ],
    },
  ],
})

const runtimeConfig = useRuntimeConfig()

function addRequirement() {
  course.value.requirements.push('')
}

function removeRequirement(index) {
  course.value.requirements.splice(index, 1)
}

function addInstructor() {
  course.value.instructors.push({ name: '', bio: '', image: '' })
}

function removeInstructor(index) {
  course.value.instructors.splice(index, 1)
}

function addLesson() {
  course.value.lessons.push({ _id: '', title: '', contents: [] })
}

function removeLesson(index) {
  course.value.lessons.splice(index, 1)
}

function addContent(lessonIndex) {
  course.value.lessons[lessonIndex].contents.push({
    _id: '',
    courseRef: course.value._id,
    lessonRef: course.value.lessons[lessonIndex]._id,
    title: '',
    url: '',
    description: '',
  })
}

function removeContent(lessonIndex, contentIndex) {
  course.value.lessons[lessonIndex].contents.splice(contentIndex, 1)
}

async function createCourse() {
  const body = {
    _id: course.value._id,
    title: course.value.title,
    description: course.value.description,
    start_date: course.value.start_date,
    students: ['1', '2'],
    instructors: ['rafi', 'zubair'],
    requirements: course.value.requirements,
  }
  try {
    const url = `${runtimeConfig.public.backendDomain}/api/course`
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })
  }
  catch (e) {
    toast.error(e || 'An unexpected error occurred')
  }
  course.value.lessons?.forEach((element) => {
    createLesson(element)
  })
}

async function createLesson(lesson) {
  const body = {
    _id: lesson._id,
    title: lesson.title,
  }
  try {
    const url = `${runtimeConfig.public.backendDomain}/api/course/${course.value._id}/lesson`
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })
  }
  catch (e) {
    toast.error(e || 'An unexpected error occurred')
  }

  lesson.contents?.forEach((content) => {
    createContent(content, lesson._id)
  })
}

async function createContent(content, lessonId) {
  const body = {
    _id: content._id,
    title: content.title,
    description: content.description,
    url: content.url,
    courseRef: course.value._id,
    lessonRef: lessonId,
  }
  try {
    const url = `${runtimeConfig.public.backendDomain}/api/course/${course.value._id}/content`
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      credentials: 'include',
    })
  }
  catch (e) {
    toast.error(e || 'An unexpected error occurred')
  }
}

function submitForm() {
  createCourse()
}
</script>

<template>
  <form class="max-w-3xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg space-y-8" @submit.prevent="submitForm">
    <!-- Course Details -->
    <div class="p-6 bg-white rounded-md shadow-md">
      <h2 class="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Course Details
      </h2>

      <div class="space-y-4">
        <div>
          <label class="block font-medium text-gray-700">Course ID:</label>
          <input v-model="course._id" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
        </div>

        <div>
          <label class="block font-medium text-gray-700">Title:</label>
          <input v-model="course.title" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
        </div>

        <div>
          <label class="block font-medium text-gray-700">Description:</label>
          <textarea v-model="course.description" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
        </div>

        <div>
          <label class="block font-medium text-gray-700">Start Date:</label>
          <input v-model="course.start_date" type="date" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
        </div>

        <div>
          <label class="block font-medium text-gray-700">Students:</label>
          <input v-model.number="course.students" type="number" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
        </div>

        <div>
          <label class="block font-medium text-gray-700">Image URL:</label>
          <input v-model="course.image" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required>
        </div>
      </div>
    </div>

    <!-- Requirements -->
    <div class="p-6 bg-white rounded-md shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Requirements
      </h2>

      <div class="space-y-4">
        <div v-for="(req, index) in course.requirements" :key="index" class="flex items-center space-x-2">
          <input v-model="course.requirements[index]" type="text" class="flex-1 p-2 border border-gray-300 rounded-md">
          <button type="button" class="text-red-500 hover:text-red-700" @click="removeRequirement(index)">
            Remove
          </button>
        </div>
        <button type="button" class="mt-2 text-blue-500 hover:text-blue-700" @click="addRequirement">
          Add Requirement
        </button>
      </div>
    </div>

    <!-- Instructors -->
    <div class="p-6 bg-white rounded-md shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Instructors
      </h2>

      <div class="space-y-6">
        <div v-for="(instructor, index) in course.instructors" :key="index" class="space-y-2">
          <input v-model="instructor.name" placeholder="Name" type="text" class="block w-full p-2 border border-gray-300 rounded-md" required>
          <input v-model="instructor.bio" placeholder="Bio" type="text" class="block w-full p-2 border border-gray-300 rounded-md" required>
          <input v-model="instructor.image" placeholder="Image URL" type="text" class="block w-full p-2 border border-gray-300 rounded-md" required>
          <button type="button" class="text-red-500 hover:text-red-700" @click="removeInstructor(index)">
            Remove
          </button>
        </div>
        <button type="button" class="mt-2 text-blue-500 hover:text-blue-700" @click="addInstructor">
          Add Instructor
        </button>
      </div>
    </div>

    <!-- Lessons -->
    <div class="p-6 bg-white rounded-md shadow-md">
      <h2 class="text-xl font-semibold text-gray-800 mb-4 pb-2">
        Lessons
      </h2>

      <div v-for="(lesson, lessonIndex) in course.lessons" :key="lessonIndex" class="space-y-4 mt-4 border-t pt-4">
        <div class="space-y-2">
          <input v-model="lesson._id" placeholder="Lesson ID" type="text" class="block w-full p-2 border border-gray-300 rounded-md" required>
          <input v-model="lesson.title" placeholder="Lesson Title" type="text" class="block w-full p-2 border border-gray-300 rounded-md" required>
          <button type="button" class="text-red-500 hover:text-red-700 mt-2" @click="removeLesson(lessonIndex)">
            Remove Lesson
          </button>
        </div>

        <!-- Contents for Each Lesson -->
        <div class="mt-4">
          <h3 class="text-lg font-semibold text-gray-700 mb-2">
            Contents
          </h3>
          <div v-for="(content, contentIndex) in lesson.contents" :key="contentIndex" class="space-y-2 mt-2 bg-gray-100 p-4 rounded-md shadow-sm">
            <input v-model="content._id" placeholder="Content ID" type="text" class="block w-full p-2 border border-gray-300 rounded-md" required>
            <input v-model="content.title" placeholder="Content Title" type="text" class="block w-full p-2 border border-gray-300 rounded-md" required>
            <input v-model="content.url" placeholder="Content URL" type="text" class="block w-full p-2 border border-gray-300 rounded-md" required>
            <textarea v-model="content.description" placeholder="Content Description" class="block w-full p-2 border border-gray-300 rounded-md" required />
            <button type="button" class="text-red-500 hover:text-red-700" @click="removeContent(lessonIndex, contentIndex)">
              Remove Content
            </button>
          </div>
          <button type="button" class="mt-2 text-blue-500 hover:text-blue-700" @click="addContent(lessonIndex)">
            Add Content
          </button>
        </div>
      </div>
      <button type="button" class="mt-4 text-blue-500 hover:text-blue-700" @click="addLesson">
        Add Lesson
      </button>
    </div>

    <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md">
      Create Course
    </button>
  </form>
</template>
