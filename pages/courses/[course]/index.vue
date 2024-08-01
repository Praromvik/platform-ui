<script setup lang="ts">
const router = useRouter()
const route = useRoute()
const courseName = route.params.course
const ifContentHidden = ref(false)
const contentTable = [{
  id: 0,
  title: 'First',
  time: '3min',
  url: 'https://www.youtube.com/embed/3Bkzl4AIXvc?si=wtMeav-GBoCM0V7n',
  completed: true,

}, {
  id: 1,
  title: 'Second',
  time: '5min',
  url: 'https://www.youtube.com/embed/fFcHnlCw3nI?si=GFHvyGy5lGPuBY8l',
  completed: true,

}, {
  id: 2,
  title: 'Third',
  time: '10min',
  url: 'https://www.youtube.com/embed/R0ksvPPrQkg?si=inj3D1E2pPj-Tafe',
  completed: true,
},
]
</script>

<template>
  <div class="px-2 py-5 sm:py-9 max-w-6xl mt-10 mx-auto">
    <div class="flex justify-center mb-6">
      <img class="h-40 w-full" src="https://miro.medium.com/v2/resize:fit:1024/1*V8JWIC-tqYQkS1b1edsu3w.png">
    </div>
    <div class="container mx-auto p-4 sm:grid sm:grid-cols-3 sm:gap-4">
      <div class="sm:col-span-2">
        <div class="mb-4">
          <h1 class="text-3xl font-bold">
            Kubernetes Basic to Advance
          </h1>
        </div>
        <div class="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit eaque libero maxime accusantium dolorum repellat dolor minima cumque unde numquam, asperiores, reiciendis, ad necessitatibus officiis similique perspiciatis dolore temporibus sed?
        </div>
        <div class="font-bold mb-2">
          ⭐Rating: 5.0
        </div>
        <div class="font-bold mb-4">
          🌐Language: English
        </div>
        <p class="text-2xl font-bold mb-1">
          Instructor
        </p>
        <div class="flex items-center space-x-4 mb-4">
          <div>
            <img class="h-20 w-20 rounded-full border-2 border-gray-500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR__2IIAULCR-xberpmuxf-9Jx3cJZLJgLm4tSb9cDwRQ&s">
          </div>
          <div>
            <p>Name : Tahsin</p>
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
              <div v-for="content in contentTable" :key="content.id" @click="router.push(`${courseName}/${content.title}`)">
                <div class="flex items-center mb-2 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="fill-current text-gray-600">
                    <path d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                  </svg>
                  <div class="ml-2">
                    <p>{{ content.title }}</p>
                    <p class="text-sm text-gray-500">
                      {{ content.time }}
                    </p>
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
        <div>
          <div class="flex justify-between items-center cursor-pointe border border-t-gray-300 border-b-gray-300 p-3" @click="ifContentHidden = !ifContentHidden">
            <div class="font-semibold">
              Module 1
            </div>
            <div>
              <Icon v-if="!ifContentHidden" name="ep:caret-bottom" size="1.5em" />
              <Icon v-else name="ep:caret-right" size="1.5em" />
            </div>
          </div>
          <div v-if="!ifContentHidden" class="border border-t-0 border-gray-300 p-3">
            <div v-for="content in contentTable" :key="content.id" @click="router.push(`${courseName}/${content.title}`)">
              <div class="flex items-center mb-2 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="fill-current text-gray-600">
                  <path d="m9.5 16.5l7-4.5l-7-4.5zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22" />
                </svg>
                <div class="ml-2">
                  <p>{{ content.title }}</p>
                  <p class="text-sm text-gray-500">
                    {{ content.time }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
