<script setup lang="ts"></script>

<template>
  <nav>
    <NuxtLink to="/" class="font-bold"
      ><div class="flex gap-1 items-center">
        <img src="/logo.png" alt="logo" width="30" height="30" />
        <h1>Expensewise</h1>
      </div></NuxtLink
    >
  </nav>
  <main>
    <slot />
  </main>
  <Footer />
</template>
