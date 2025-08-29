<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "authentication",
});

// the zod schema
const schema = z.object({
  email: z.email("Please input a valid email").nonempty("Please input email"),
  password: z.string().nonempty("Please input password"),
});
type Schema = z.output<typeof schema>;

// the states
const show = ref(false);
const state = reactive<Schema>({
  email: "",
  password: "",
});

// the register/signup function
const { loginUser, loading, error } = useAuth();

const toast = useToast();
const router = useRouter();
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  await loginUser(event.data.email, event.data.password);
  if (error.value) {
    toast.add({
      title: "Error",
      description: "Invalid email or password.",
      color: "error",
    });
    console.log(error.value);
  } else {
    router.push("/dashboard");
    toast.add({
      title: "Success",
      description: "User login successful",
      color: "primary",
    });
  }
};
</script>

<template>
  <!-- the form -->
  <div class="min-h-screen justify-center items-center flex flex-col">
    <Card class="w-full lg:max-w-lg">
      <div class="mb-4">
        <h1 class="text-2xl font-bold">Log into your account</h1>
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
        <!-- the password -->
        <FormField
          label="Password"
          name="password"
          class="font-semibold"
          required
        >
          <Input
            v-model="state.password"
            placeholder="Password"
            :type="show ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1', root: 'w-full' }"
          >
            <template #trailing>
              <Button
                color="neutral"
                variant="link"
                size="sm"
                :icon="show ? 'lucide-eye-off' : 'lucide-eye'"
                :aria-label="show ? 'Hide password' : 'Show password'"
                :aria-pressed="show"
                aria-controls="password"
                @click="show = !show"
              />
            </template>
          </Input>
          <!-- Forgot password -->
        <p class="mt-3">
          Forgot my password?
          <NuxtLink to="/forgot-password" class="cursor-pointer underline"
            >Help</NuxtLink
          >
        </p>
        </FormField>
        
        <!-- the button -->
        <Button
          type="submit"
          class="w-full flex items-center justify-center"
          :loading="loading"
          >Submit</Button
        >
        <!-- Already have an account -->
        <p class="text-center">
          I don't have an account?
          <NuxtLink to="/signup" class="cursor-pointer underline"
            >Sign up</NuxtLink
          >
        </p>
      </Form>
    </Card>
  </div>
</template>

<style scoped></style>
