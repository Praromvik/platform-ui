<script setup>
import { ref } from 'vue'

import DashboardView from '../../components/profile/DashboardView.vue'
import SettingsView from '../../components/profile/SettingsView.vue'
import CoursesView from '../../components/profile/CoursesView.vue'
import CertificationView from '../../components/profile/CertificationView.vue'

const activeSection = ref('dashboard')

function setActiveSection(section) {
  activeSection.value = section
}
</script>

<template>
  <div class="py-5 mt-8">
    <div class="flex flex-col md:flex-row px-6 py-5 gap-5 container max-w-6xl mx-auto">
      <!-- Sidebar -->
      <div class="w-full md:w-64 md:flex-shrink-0">
        <nav>
          <ul>
            <li class="nav-item" :class="{ active: activeSection === 'dashboard' }" @click="setActiveSection('dashboard')">
              <a href="#">
                <i class="fas fa-tachometer-alt" /><span class="menu-text">Basic</span>
              </a>
            </li>
            <li class="nav-item" :class="{ active: activeSection === 'courses' }" @click="setActiveSection('courses')">
              <a href="#">
                <i class="fas fa-user" /><span class="menu-text">My Courses</span>
              </a>
            </li>
            <li class="nav-item" :class="{ active: activeSection === 'settings' }" @click="setActiveSection('settings')">
              <a href="#">
                <i class="fas fa-file-alt" /><span class="menu-text">Settings</span>
              </a>
            </li>
            <li class="nav-item" :class="{ active: activeSection === 'certification' }" @click="setActiveSection('certification')">
              <a href="#">
                <i class="fas fa-play" /><span class="menu-text">Certifications & Badges</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Main Content -->
      <div class="flex-grow">
        <DashboardView v-if="activeSection === 'dashboard'" />
        <CoursesView v-if="activeSection === 'courses'" />
        <SettingsView v-if="activeSection === 'settings'" />
        <CertificationView v-if="activeSection === 'certification'" />
      </div>
    </div>
  </div>
</template>

  <style scoped>
  .nav-item {
    padding: 10px 20px;
    cursor: pointer;
  }

  .nav-item.active {
    background-color: #4a5568;
  }

  .nav-item.active a {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    .flex-col.md\:flex-row {
      flex-direction: column;
    }

    .md\:w-64 {
      width: 100%;
    }

    .md\:flex-shrink-0 {
      flex-shrink: 0;
    }
  }
  </style>
