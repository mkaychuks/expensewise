<script setup lang="ts"></script>

<template>
  <footer id="footer">
    <Container class="max-w-lg mx-auto flex flex-col items-center gap-2">
      <div class="flex item-center justify-between w-full">
        <NuxtLink class="cursor-pointer">Privacy</NuxtLink>
        <NuxtLink class="cursor-pointer">Contact</NuxtLink>
      </div>
      <p class="text-gray-500">©{{ new Date().getFullYear() }} ExpenseWise. All rights reserved</p>
    </Container>
  </footer>
</template>
