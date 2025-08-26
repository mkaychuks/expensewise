<script setup lang="ts">
const show = ref(false);

const onSubmit = () => console.log("form submitted");

definePageMeta({
  layout: "authentication"
})

</script>

<template>
  <!-- the form -->
  <div class="min-h-screen justify-center items-center flex flex-col">
    <div>
      <h1 class="text-2xl font-bold">Log into your account</h1>
    </div>
    <Form @submit="onSubmit" class="w-full lg:max-w-lg space-y-4">
      <!-- the email field -->
      <FormField label="Email" name="email" class="font-semibold" required>
        <Input class="w-full" placeholder="Enter your email" />
      </FormField>
      <!-- the password -->
      <FormField label="Password" name="password" class="font-semibold" required>
        <Input type="password" class="w-full" placeholder="Enter your password">
          <template #trailing>
            <Button
              variant="link"
              size="sm"
              :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
              :aria-label="show ? 'Hide password' : 'Show password'"
              :aria-pressed="show"
              aria-controls="password"
              @click="show = !show"
            />
          </template>
        </Input>
      </FormField>
      <!-- the button -->
      <Button type="submit" class="w-full flex items-center justify-center"
        >Submit</Button
      >
      <!-- Already have an account -->
      <p class="text-center">
        I don't have an account?
        <NuxtLink to="/signup" class="cursor-pointer underline">Sign up</NuxtLink>
      </p>
    </Form>
  </div>
</template>

<style scoped></style>
