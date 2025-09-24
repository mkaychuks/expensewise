<script lang="ts" setup>
// check the user authentication status
const user = useCurrentUser();
</script>
<template>
  <nav>
    <div class="flex items-center justify-between">
      <!-- the logo section -->
      <NuxtLink to="/" class="font-bold">
        <div class="flex gap-1 items-center">
          <img src="/logo.png" alt="logo" width="30" height="30">
          <h1>Expensewise</h1>
        </div>
      </NuxtLink>
      <!-- the buttons -->
      <div class="gap-2 flex items-center" v-if="!user">
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
      <!-- the dashboard button when user is authenticated -->
      <div v-else>
        <NuxtLink
          to="/dashboard"
          class="bg-primary px-2.5 py-1.5 text-sm gap-1.5 rounded-md text-white"
          >Dashboard</NuxtLink
        >
      </div>
    </div>
  </nav>
</template>
