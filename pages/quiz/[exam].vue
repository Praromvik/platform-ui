<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

interface Question {
  question: string
  options: string[]
  correct: string
}

const currentIndex = ref(0)
const selectedOption = ref<string | null>(null)
const answers = ref<Record<number, string>>({})
const timeLeft = ref(300) // 5 minutes in seconds
const isStarted = ref(false)
const showResults = ref(false)
const score = ref(0)

const questions: Question[] = [
  {
    question: 'What is your favorite color?',
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    correct: 'Blue', // Example correct answer
  },
  {
    question: 'What is the capital of France?',
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    correct: 'Red', // Example correct answer
  },
  {
    question: 'What is the tallest mountain on Earth?',
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    correct: 'Green', // Example correct answer
  },
]

// Timer formatting
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Quiz navigation
function handleNext() {
  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
    selectedOption.value = answers.value[currentIndex.value] || null
  }
}

function handlePrev() {
  if (currentIndex.value > 0) {
    currentIndex.value--
    selectedOption.value = answers.value[currentIndex.value] || null
  }
}

function handleOptionSelect(option: string) {
  selectedOption.value = option
  answers.value[currentIndex.value] = option
}

function startQuiz() {
  isStarted.value = true
}

function handleSubmit() {
  const totalQuestions = questions.length
  const correctAnswers = Object.entries(answers.value).reduce((acc, [index, answer]) => {
    return acc + (answer === questions[Number(index)].correct ? 1 : 0)
  }, 0)
  score.value = (correctAnswers / totalQuestions) * 100
  showResults.value = true
}

// Timer logic
let timer: ReturnType<typeof setInterval>

watch(isStarted, (newValue) => {
  if (newValue && !showResults.value) {
    timer = setInterval(() => {
      if (timeLeft.value <= 1) {
        handleSubmit()
        clearInterval(timer)
      }
      else {
        timeLeft.value--
      }
    }, 1000)
  }
})

// Cleanup
onUnmounted(() => {
  clearInterval(timer)
})

// Leave warning
function handleBeforeUnload(e: BeforeUnloadEvent) {
  if (isStarted.value && !showResults.value) {
    e.preventDefault()
    e.returnValue = 'You will receive a score of 0 if you leave. Are you sure?'
    return e.returnValue
  }
}

onMounted(() => {
  window.addEventListener('beforeunload', handleBeforeUnload)
})

onUnmounted(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload)
})
</script>

<template>
  <!-- Start Screen -->
  <div v-if="!isStarted" class="max-w-xl mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden">
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">
        Welcome to the Quiz
      </h2>
      <p class="mb-4">
        You will have 5 minutes to complete {{ questions.length }} questions.
      </p>
      <button class="bg-sky-700 text-white px-6 py-2 rounded-xl hover:bg-sky-800 transition-all" @click="startQuiz">
        Start Quiz
      </button>
    </div>
  </div>

  <!-- Results Screen -->
  <div v-else-if="showResults" class="max-w-xl mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden">
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">
        Quiz Results
      </h2>
      <div class="space-y-4">
        <p class="text-lg font-semibold">
          Your Score: {{ score.toFixed(1) }}%
        </p>
        <div class="space-y-2">
          <div v-for="(q, idx) in questions" :key="idx" class="p-4 rounded-lg bg-gray-100">
            <p class="font-medium">
              {{ q.question }}
            </p>
            <p class="text-sm">
              Your answer: {{ answers[idx] || 'Not answered' }}
            </p>
            <p class="text-sm text-green-600">
              Correct answer: {{ q.correct }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Quiz Screen -->
  <div v-else class="max-w-xl mx-auto mt-8 bg-white rounded-xl shadow-md overflow-hidden">
    <div class="p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">
          Question {{ currentIndex + 1 }}/{{ questions.length }}
        </h2>
        <div class="text-lg font-semibold">
          Time left: {{ formatTime(timeLeft) }}
        </div>
      </div>

      <!-- Question -->
      <div class="space-y-6">
        <p class="text-lg">
          {{ questions[currentIndex].question }}
        </p>

        <!-- Options -->
        <div class="space-y-2">
          <div
            v-for="(option, idx) in questions[currentIndex].options"
            :key="idx"
            class="p-3 rounded-lg cursor-pointer transition-all" :class="[
              selectedOption === option
                ? 'bg-sky-700 text-white border-2 border-green-500'
                : 'bg-sky-700 text-white hover:bg-sky-800',
            ]"
            @click="handleOptionSelect(option)"
          >
            <label class="flex items-center cursor-pointer">
              <input
                type="radio"
                class="hidden"
                :checked="selectedOption === option"
                @change="handleOptionSelect(option)"
              >
              <span>{{ option }}</span>
            </label>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex justify-between mt-6">
          <button
            v-if="currentIndex > 0"
            class="flex items-center gap-2 bg-sky-700 text-white px-6 py-2 rounded-xl hover:bg-sky-800 transition-all"
            @click="handlePrev"
          >
            ← Prev
          </button>
          <button
            v-if="currentIndex < questions.length - 1"
            class="flex items-center gap-2 bg-sky-700 text-white px-6 py-2 rounded-xl hover:bg-sky-800 transition-all ml-auto"
            @click="handleNext"
          >
            Next →
          </button>
          <button
            v-else
            class="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition-all ml-auto"
            @click="handleSubmit"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
