<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "authentication",
});

// the zod schema
const schema = z.object({
  email: z.email("Please input a valid email").nonempty("Please input email"),
});
type Schema = z.output<typeof schema>;

// the states
const state = reactive<Schema>({
  email: "",
});
const { passwordResetEmail, loading, error } = useAuth();


const toast = useToast();
const router = useRouter();
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  await passwordResetEmail(event.data.email);
  if (error.value) {
    toast.add({
      title: "Error",
      description: "Invalid email.",
      color: "error",
    });
    console.log(error.value);
  } else {
    router.push("/signin");
    toast.add({
      title: "Success",
      description: "Check your email for instructions",
      color: "primary",
    });
  }
};
</script>

<template>
  <!-- the form -->
  <div class="min-h-screen justify-center items-center flex flex-col">
    <Card class="w-full lg:max-w-lg sm:mt-10 lg:mt-0">
      <div class="mb-4">
        <h1 class="text-2xl font-bold">Request for Password Reset</h1>
      </div>
      <Form
        :state="state"
        :schema="schema"
        @submit.prevent="onSubmit"
        class="w-full lg:max-w-lg space-y-6"
      >
        <!-- the email field -->
        <FormField label="Email" name="email" class="font-semibold" required>
          <Input
            class="w-full"
            placeholder="Enter your email"
            v-model="state.email"
          />
        </FormField>
        <!-- the button -->
        <Button
          type="submit"
          class="w-full flex items-center justify-center"
          :loading="loading"
          >Submit</Button
        >
      </Form>
    </Card>
  </div>
</template>

<style scoped></style>
