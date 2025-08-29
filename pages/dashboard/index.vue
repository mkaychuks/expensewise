<script setup lang="ts">

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const currentUser = useCurrentUser();

</script>

<template>
  <div>
    This is the dasboard landing page {{ currentUser?.displayName }}
  </div>
</template>

<style scoped></style>
