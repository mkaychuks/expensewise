<script setup lang="ts">
const showMenu = ref(false);
</script>

<template>
  <!-- the navigation bar of the dashboard -->
  <nav class="flex items-center justify-between relative">
    <!-- the logo -->
    <NuxtLink to="/" class="font-bold">LOGOiPSUM</NuxtLink>
    <!-- the dashboard links -->
    <div>
      <!-- the dashboard link -->
      <ul class="hidden md:flex items-center gap-8">
        <li><NuxtLink>Dashboard</NuxtLink></li>
        <li><NuxtLink>Transactions</NuxtLink></li>
        <li><NuxtLink>Reports</NuxtLink></li>
        <li><Button class="text-base font-normal" leading-icon="lucide:log-out">Logout</Button></li>
      </ul>
    </div>
    <!-- the mobile navigation -->
    <div class="md:hidden">
      <button class="p-2" @click="showMenu = !showMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </div>
    <div
      class="absolute top-full left-0 w-full bg-primary text-white p-4 md:hidden text-center"
      v-show="showMenu"
    >
      <ul class="flex flex-col gap-3">
        <li><NuxtLink>Dashboard</NuxtLink></li>
        <li><NuxtLink>Transactions</NuxtLink></li>
        <li><NuxtLink>Reports</NuxtLink></li>
        <li><Button class="text-base font-normal" leading-icon="lucide:log-out">Logout</Button></li>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
