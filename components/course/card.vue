<script setup lang="ts">
import { defineProps, withDefaults } from 'vue'

// Define interface for props
interface Props {
  path?: string
  title: string
  instructor?: string
  description: string
  image?: string
  alt?: string
  tags?: Array<string>
  startDate?: string
  studentNumbers?: number
  price?: number
  moderators?: Array<string>
}

// Define props with default values
withDefaults(defineProps<Props>(), {
  path: '/',
  title: 'No Title',
  instructor: 'Arnob Kumar Saha',
  description: 'No Description',
  image: '/default-course-image.jpg',
  alt: 'No Alt Text',
  tags: () => ['kubernetes'],
  startDate: 'No Start Date',
  studentNumbers: 0,
  price: 10000,
  moderators: () => [],
})
</script>

<template>
  <article class="group border dark:border-gray-800 m-2 overflow-hidden rounded-2xl shadow-sm text-zinc-700 dark:text-zinc-300">
    <NuxtLink :to="path">
      <NuxtImg
        class="lg:h-48 md:h-36 w-full object-cover object-center rounded-t-2xl shadow-lg group-hover:scale-[1.02] transition-all duration-500"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAACoCAMAAACPKThEAAAAjVBMVEX///8ybeoua+r3+v47c+sqaeo2cOvp7/0mZ+koaOkhZeloj+5zmfAeZOn8/f/t8v3y9v5IfOze5/tWhe1DeOvJ1/gXYem9zveJqPGtwvVvle95nfDk7Pzd5vvC0veZs/PR3fqFpPGZtPOlvPVbiO21yPZXhu1Nf+yqwPWJp/GAofBjje7V4PqSrfKswvXa4TatAAANO0lEQVR4nO1diZKiMBANDYEQBEHwxAMVxplR9/8/b5OADuAFHsPhvNqqdWfUJa/SndedTgehP/zhTWBZVT9BI6DN953QdbedfV+r+llqDTsyVEowYPaHUNWI5KqfqK6w1oqJpRSw6Y2rfqh6YqgQkHIA4s2rfq76YRaaJ0wJtkyjV/Wz1Qva1+AsU7Eljuyqn68+kNcqucQUB1U+/0REjOGGXmOKGyJ1+1U/ZR2w2xJ8gyrh5Cezqp+0athLvQBTwm3h/XurrbF6qhMuG6IaVf281aGvmEWJijFwgqqfuRrsJucV1VVDpP4bqq3uguhlmeIg0urN1Jb1qdDSk+rAlvJWbqvvFnfppwASBlWP4LegTe6eUwkw8btVj+I3II8GBRXVtamlm4vWhz1WpNwKaAqyRZVh1YN5LfpueZ1wkS1zG1Q9ntdh2tGfxhQHxt8tzcnbC/W5VPEVUVm3MUiMvOc4qhxMp3VJ5sB9VCdcAtCwVWGP5j/PpZ8Cm8vWhD3y6r7QrzgItCTJPPReZX4p0Da4rZ3xC0xJPOxpepJZ+y6aIn4cOowarLastfRsRXUVTG1VPeR70XdeoqiuwdwEVY/6HszCy1vJrwMebKdVj7wsussiu34vYQv2zcptPZAifhzEa1CSebZ9pUy/DTCNpqyIgfdimX4butcMsRVARZ4qDVB3VfNQALtHtmieByzVP/tgKzWYVRzg1D75YFytOvtN0GXVXNzAfPCMYQI8w45JzevbnMcHqRNvu/X0x9dS2FTNxlUMSxYJnYKYnb6MkLzz6cNsDWo9sbaPTSvQaee4fPUYW499He5UycUNaNJDg9N1UV3V/fT9MV/Eet+PWSKQGm+IRY8sgkT65kxN92AS3ZQWPAKefkuPfKVZ4218//5pQJUvnkzpfR3Iocqe/2D6db32/SrIqGpGLsO9V4cSacTn1CwzjYgyEvSN7p5bEFbNyEXI3n3uikhiCgU+kPwvljwGnn5J92VYwauakovoKveMh6jCNQUTOLPs6ZLP2dJG0l0JMa+224aaWn40VBdM8dMT58nQdSEjtBG9wxKV2i6EpbkCoqz4aOZuJjcPenqGAR5MeILF3qulLbE1XAHx1kxGyfMwa1+wCYKs58NkEjBr6u7PHMd8B66AOoKp6KTUj6uicW4KYWLwgEVblEvkt4Mr6oxlfhh8Q090hslYiU7MDZPtnM+tVRm22sAVAJ9T9ufm3M6YGSG0PuPIsR4KtvbFnXwLuAIp4KdRLxTQ0BVC32cjACAuj1rmhcOD5nMFeI7QP/2SLelfCIUXfoepNywRdzafK+wjtLqcQNXZrzcXoyUYjBEyCgZTzeeK9NHs8mBhsEBoZF5OI8O08MRqPleKjVYXBqtT1eHVn92OI52ukDHIGvWK/k9N5wq2CE0OPKRnDybKcjhNtqrsWeRnT/geXuMJkt1iuqHxXJE9shNdjpVUvwHTjXJbet31j5gC01Hi1+DJRTNlzedqiHqxCcLWRlEi24kSnUkKyCuczEAytuSNeCvADI2LOaymcwXcN8f7PYTXLAqJDrRzoWqq59KYKvY6UaEkQrv3mFc8AZdITdjyqRQRAHqo9NSi7z37S95+R0ldkLWkzJP94y+TvKu+RHaxVFnTuWLqSj4km/Utz+RFyuEIc9CRqMnkFbIcSiU/qXVZEC5AUW+bTCb8YRVUWE3nio7R9PhGLK14iBfb39QnOggpGk8hXf+OfxF0ueeSjnanaoy/d+BqMEPzVBaBhodi2KRZWMyV2JUF4h22jrUw9Rmzj+ZvwZUqo0U640KS3eHDghhzlQgwwMkW3yT9ERZdF9u2bThXOEwpUUHHRzygXpL007/5v2IBBWZSgm0rGdE6KVhl0nCuyALJmfeR42GHRWyDom7qi3MFP7/bp+cVeDZaFlENDeeK+Zpd2tdwFX5An1flMjJRLKV+vBVCs7TNAezOZE7bx9XARv8y7kpQk3QS7XYomGIurehRntriuFvGbmmEekXKl5rNFTjZsgeu4pla0LdJKDiW4grivnmo6O9ugY94mJ6MzE6tImq02Vwxz21tUuaERcnBnpCPRDpMk79nScwzdXWTxzeZAgBwi6nRZnPFlGg3bT3Ce1tsUbtQvj/zMNPp/NVXZjZ2mZW2nSt9h+Zprgbc4gJuXyCdKVkMVODM8F36eUZhzVFQoIy32Vyxp0+HJwDcT8VZUoATsuZxsk8kGTLqk60IVgHn3miuuIpMV2lxV49QJxHpEPsoK0iC5sPUiSVXxmFtC1V7NZorFp3YGe64a7fChCthkGgaEmoI1qKkJIQzk+OGRUqj2yFho7niSjRtO9hgn5N5vIIJcWKV3mEcUBHoyHuP8J3puFI9o7BYBD687dwbzZU6RZ/pIXKbRLZHqOkugnhgFhcDgkMGub93TUocnhPsZNToGPVun65oMlc4lLNDBjGvNpNx6nDk2ASgPxXElhZNxLzKCCrcEUqjxVxxJ53R27F15Ua0NAe5AmLxhoy/4plo/6ZzbzJXJELTg0cGBmIuzn3R7uzhkP1AT1kdyVlz67jCs2NchyXHDb+D9OctWcuMrTu109tgVuSHjnooKzWH2XxF27ji+ZdRHKpgY2anBmJ1d+OR4ahh6mddT3KM0ThIE2hP+8mZH7Lnb2gvV3zVOww1jv7kOL2w2qiEqQPm01Mnb2eEWalOqeTE3qsbvzeINQd2kXXzqFSDudJHx3QBZS7J6nccT2Tbk73V3JG/gzPnVURMSiiez4/LrRMvBZcq2trBFbObA1fgrZYbwmYO4VpdTpZ/+im+aByL0s9kJ1/lXqvPlIROnG//4N9xu7niB/qO6pvERexEKPT47C9gYWbRYCBSoUk0FJ/WimUZ6AffDh9sqrXYBsGRUf9koRfJvQmfQ0Rsd8kOxhsxSDFv4j2xXf5TjMHbZ1oazBXXV2iUI4uIJILtsHkzCPhL7pCIMMYdm214I8LoTs7ceMCYL4JvF1fgsIFvs8NO0lY9D7OlDXGpAPGuFuLeHXti2g1zVOEPGWlKq2McYVBdLxubwEbw0nMGYjLFueF4e+ffYCNERDd32g4UxqBxe4ew0VyJ4vUgN8hkl74ruhtriRNS+T9sP9ZUk6xCB8J8/77tedG4EUDe0ZipUPngzmjqZ34umOFbiMMiXTMazhUvuUZf+cEfidG4fudXNRI4SvhlbgbxeTgrVFzbdK6wKyM5zKVTTP8wql607xhG52s8S+Jmu5OjCjP/Zm/egiuhPqf5o9HUDc5/abDJZxPU2alVtpUrIZ76+SO7une2B9NUzSf0BsPzx8DayZXEFdU655tF2Hw6tGn+s3TPiS74H7WAK+wxQdDJLoa8nK/nuOvd4dzE7jMMNWRts7wQAxURoe3hStK3fEcikz/XAyS7OiZU2oSGEW5USoBsUK4wFHtdZIVvdH5QikXCND09eDuTpCMUYIYkRzPPNV6BHftB8eP0reCKV5ulz5cCH9XkxA3xY5fTn2wC6GMmZEu0bmsHVyKJ/HMyjux/opsURIPC0ZFSwqjbvd85eglzGo4ySZydPyMEeOB33IvHWxlppbrctYQrEakc5Tee7MbnVjfsznYfiWmCwpbFSam2UW3hSqRdZoe5xALAs2/ifj55yaPuS+dZ284VkGGZbogiuVCyKXV9uSrb0wmUXq7I/woo16pqycZOXm25Kt0rDLt20U63IjtxuRPBedS4V1j5HnR846ZbZGUDZVZKhCafqm8Pujt6G5qfCAUFjmxx7bAu3ei1zr0Ny/fMBBow/S6ZOr4GyguR++U7s9a5Z6ZWvqceF02ou/Y7V+CvtTLJhZ/vpnW+SuGOHr/gFLqkpeeU78dZ6x6/d/WOBmkxvdGu0Zqu7ukeXO/e0ff1JCewMa5ik288Wgi43j3J7+x1Dzdxz7fWvdd9foe4QsTFSnXG390cJbD71Wv0LgJLTbhNqIgMfzmacZfQ3x1VpaAZf3efFce4bOPiZzLVqDv1EG8hjitaDzGM6r8A5tDbVnEHKDTwDlCOCu6WpUrdtfolWGvpN90WNPjOYsSvmP09t6XDV7MulT3BzvidC3kxnTRDfV7F0PmFO3mpM696nE+BvL6wp/w0EPxZ28tdyqLrv1LIY3PZIJl+G4H7qhUR6EdTYr/CGHovUVtmSxxVFvZKfXZqiyuq2lYsPIap/1xDxPi7VY4qi93HwxeqHgFmGFQ9npfCispfynUeRK3xBvyTIO8Hjwt50AeL1iiqa9Amjwp5TPyGh37F0f94xMkDabmjysJ6IMlMlWaliB9Hd0Hu2u0h0qJxKeLHsZuUDxIx9VsX0BRD3yuptgaboOpnrg5jtbjbAqq+m6PKwl4WTZtivG9p6FccO+PSHWeZSUUmb+qoshhuboU9QD+aupf1bMhr9WqSmSrtSRE/Du3rcpCIzeZtur8Ws/C82gLT6N3+9LtheCbsAeK1MUX8OKy1YmYsEZveuOqHqi3syFApwSAaFVHViN5eUV2FNt93Qtfddvb9FufSnwjrTyL84X3wHw9n3VrLnJ59AAAAAElFTkSuQmCC"
        :alt="alt"
      />
      <div class="px-3 pb-4">
        <div class="text-black dark:text-zinc-300 pt-3 pb-2">
          <!-- Course Title using props.title -->
          <h2 class="text-xl font-semibold pb-1 group-hover:text-sky-700 dark:group-hover:text-sky-400">
            {{ title }}  <!-- Using props.title -->
          </h2>
          <!-- Instructor using props.instructor -->
          <div class="flex items-center mb-2">
            <span>Instructor: {{ instructor }}</span>  <!-- Using props.instructor -->
          </div>
          <!-- Course Details -->
          <div class="flex flex-wrap items-center gap-1">
            <div class="flex items-center gap-1">
              <LogoTag />
              <span>{{ price }} BDT</span>
            </div>
            <div class="flex items-center gap-1">
              <Icon name="mdi:account" size="2em" class="text-black dark:text-zinc-300" />
              <span> {{ studentNumbers }}</span>
            </div>
          </div>
          <!-- Date -->
          <div class="flex items-center mb-2">
            <Icon name="mdi:calendar" size="1.5em" class="text-black dark:text-zinc-300" />
            <span> Coming Soon</span> <!-- Assuming date is a prop -->
          </div>
        </div>
        <!-- Description using props.description -->
        <p class="text-ellipsis line-clamp-2 text-base">
          {{ description }}  <!-- Using props.description -->
        </p>
        <!-- Read More Link -->
        <div class="flex group-hover:underline text-sky-700 dark:text-sky-400 items-center py-2">
          <button>Enroll</button>
          <LogoArrow />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

  <style scoped>
  /* Add your custom styles here */
  </style>
