<script setup lang="ts">
const { isDesktop } = useDesktop();
</script>

<template>
  <Navbar v-if="isDesktop" />
  <main>
    <slot />
  </main>
  <Footer v-if="isDesktop" />
</template>

<style scoped></style>
