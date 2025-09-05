<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});
useHead({
  title: "Expensewise | Transactions",
});

const currentUser = useCurrentUser();
const data = ref([
  {
    date: "2024-03-11T15:30:00",
    description: "4600",
    category: "paid",
    amount: 594,
  },
  {
    date: "2024-03-11T10:10:00",
    description: "4599",
    category: "failed",
    amount: 276,
  },
  {
    date: "2024-03-11T08:50:00",
    description: "4598",
    category: "refunded",
    amount: 315,
  },
  {
    date: "2024-03-10T19:45:00",
    description: "4597",
    category: "paid",
    amount: 529,
  },
]);
const items = ref(["Backlog", "Todo", "In Progress", "Done"]);
const value = ref("Backlog");

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

// the states
const show = ref(false);
const state = reactive<Schema>({
  email: "",
  password: "",
  username: "",
});

// the register/signup function
const { register, loading, error } = useAuth();

const toast = useToast();
const router = useRouter();
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  await register(event.data.username, event.data.email, event.data.password);
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
  <section class="md:py-6 py-4">
    <!-- the salutation and action button -->
    <div class="flex items-center justify-between sm:mb-10 mb-4">
      <!-- the left -->
      <div class="flex flex-col items-start">
        <h1 class="font-bold text-3xl">Transactions</h1>
        <p class="text-secondary text-sm mb-3">
          Below are, {{ capitalize(currentUser?.displayName!) }}'s transaction
          history
        </p>
      </div>
      <!-- the right -->
      <Modal
        title="Add a transaction"
        :dismissible="false"
        :overlay="true"
        :ui="{
          overlay: 'bg-gray-200/50',
          title: 'font-bold text-2xl leading-0'
        }"
      >
        <Button
          @click=""
          class="text-base font-normal"
          leading-icon="lucide:circle-dollar-sign"
          >Add Transaction</Button
        >

        <template #body>
          <Form
            :state="state"
            :schema="schema"
            @submit.prevent="onSubmit"
            class="w-full lg:max-w-lg space-y-6"
          >
            <!-- the email field -->
            <FormField
              label="Amount"
              name="amount"
              class="font-semibold"
              required
            >
              <Input
                class="w-full"
                placeholder="Enter your recent expense amount"
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
            <!-- the select of category -->
            <FormField
              label="Username"
              name="username"
              class="font-semibold"
              required
            >
              <Select v-model="value" :items="items" class="w-full" />
            </FormField>
            <!-- the button -->
            <Button
              type="submit"
              class="w-full flex items-center justify-center"
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
        </template>
      </Modal>
    </div>
    <!-- the table -->
    <div class="">
      <Table
        :data="data"
        class=""
        :ui="{
          root: 'border-2 border-gray-300 rounded-md',
          thead: 'uppercase',
          td: 'text-green-500',
          tr: 'border-gray-300',
          tbody: 'border-gray-300 border-t',
        }"
      />
    </div>
  </section>
</template>

<style scoped></style>
