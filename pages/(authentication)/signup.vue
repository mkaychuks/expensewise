<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

// page Meta and configs
definePageMeta({
  layout: "authentication",
});
useHead({
  title: "Expensewise | Sign Up",
});

// the zod schema
const schema = z.object({
  email: z.email("Please input a valid email").nonempty("Please input email"),
  password: z
    .string()
    .nonempty("Please input password")
    .min(8, "Password must be at least 8 characters long"),
  username: z.string().nonempty("Please input username"),
});
type Schema = z.output<typeof schema>;

// the states and composables
const show = ref(false);
const toast = useToast();
const router = useRouter();
const state = reactive<Schema>({
  email: "",
  password: "",
  username: "",
});
const auth = useAuth();
const { loading, error } = toRefs(auth);

// Methods
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  await auth.register(
    event.data.username,
    event.data.email,
    event.data.password
  );
  if (error.value) {
    toast.add({
      title: "Error",
      description: "An account with this credential already exists.",
      color: "error",
    });
    console.log(error.value);
  } else {
    router.push("/dashboard");
    toast.add({
      title: "Success",
      description: "User credentials have been successfully submitted.",
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
        <h1 class="text-2xl font-bold">Create your account</h1>
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
        <!-- the username field -->
        <FormField
          label="Username"
          name="username"
          class="font-semibold"
          required
        >
          <Input
            class="w-full"
            placeholder="Choose a username"
            v-model="state.username"
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
            :type="show ? 'text' : 'password'"
            class="w-full"
            placeholder="Enter your password"
            v-model="state.password"
          >
            <template #trailing>
              <Button
                color="neutral"
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
        <Button
          type="submit"
          class="w-full flex items-center justify-center"
          :loading="loading"
          >Submit</Button
        >
        <!-- Already have an account -->
        <p class="text-center">
          Already have an account?
          <NuxtLink to="/signin" class="cursor-pointer underline"
            >Sign in</NuxtLink
          >
        </p>
      </Form>
    </Card>
  </div>
</template>

<style scoped></style>
