<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});

const errorMessage = computed(() => {
  if (props.error?.statusCode === 404) {
    return "We couldn't find the page you were looking for. It might have been moved or deleted.";
  } else {
    return "An unexpected error occurred.";
  }
});

// handle the navigation
const handleNavigation = () => {
  navigateTo("/");
};
</script>

<template>
  <Container>
    <Navbar />
    <div
      class="min-h-screen text-center flex justify-center items-center flex-col gap-2"
    >
      <h1 class="font-extrabold text-3xl">{{ error?.statusCode }}</h1>
      <h1 class="font-bold text-xl">
        {{ errorMessage }}
      </h1>
      <Button @click="handleNavigation" size="xl">Go back home</Button>
    </div>
  </Container>
</template>
