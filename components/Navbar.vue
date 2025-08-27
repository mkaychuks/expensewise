<script lang="ts" setup></script>
<template>
  <nav>
    <div class="flex items-center justify-between">
      <!-- the logo section -->
      <NuxtLink to="/" class="font-bold">LOGOiPSUM</NuxtLink>
      <!-- the buttons -->
      <div class="gap-2 flex items-center">
        <NuxtLink
          to="/signup"
          class="bg-primary px-2.5 py-1.5 text-sm gap-1.5 rounded-md text-white"
          >Sign Up</NuxtLink
        >
        <NuxtLink
          to="/signin"
          class="bg-secondary px-2.5 py-1.5 text-sm gap-1.5 rounded-md text-white"
          >Sign In</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>
