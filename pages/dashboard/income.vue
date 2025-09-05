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

const currentUser = useCurrentUser(); // get the current user
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
const items = ref(incomeCategory);
const incomeStore = useIncomeStore();

// the zod schema
const schema = z.object({
  amount: z.string().min(0, "Amound should not be less than 0"),
  category: z.string().nonempty("Please select a category"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  description: z.string().nonempty("Please add a brief description"),
});
type Schema = z.output<typeof schema>;

// the states
const state = reactive<Schema>({
  amount: "",
  category: "Backlog",
  date: "",
  description: "",
});

const toast = useToast();
const router = useRouter();
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  await incomeStore.addIncome(
    { ...event.data, amount: Number(event.data.amount) },
    currentUser.value?.uid!
  );
};
</script>

<template>
  <section class="md:py-6 py-4">
    <!-- the users income table - START -->
    <div class="flex items-center justify-between">
      <!-- the left -->
      <div class="flex flex-col items-start">
        <h1 class="font-bold text-3xl">Income</h1>
        <p class="text-secondary text-sm mb-3">
          Below are, {{ capitalize(currentUser?.displayName!) }}'s income
          history
        </p>
      </div>
      <!-- the right -->
      <div class="flex gap-3 items-center">
        <!-- category modal -->
        <!-- the transaction modal and its content -->
        <ReuseableModal title="Add Income">
          <template #modal-button>
            <Button
              @click=""
              class="text-base font-normal"
              leading-icon="lucide:circle-dollar-sign"
              >Add Income</Button
            >
          </template>
          <template #reusable-content>
            <Form
              :state="state"
              :schema="schema"
              @submit.prevent="onSubmit"
              class="w-full lg:max-w-lg space-y-6"
            >
              <!-- the amount field -->
              <FormField
                label="Amount"
                name="amount"
                class="font-semibold"
                required
              >
                <Input
                  class="w-full"
                  placeholder="Enter your recent expense amount"
                  v-model="state.amount"
                />
              </FormField>
              <!-- the select of category -->
              <FormField
                label="Category"
                name="category"
                class="font-semibold"
                required
              >
                <Select
                  v-model="state.category"
                  :items="items"
                  class="w-full"
                />
              </FormField>
              <!-- the Date field -->
              <FormField
                label="Date"
                name="date"
                class="font-semibold"
                required
              >
                <Input
                  class="w-full"
                  placeholder="Select transaction date"
                  v-model="state.date"
                  type="date"
                />
              </FormField>
              <!-- the description field -->
              <FormField
                label="Description"
                name="description"
                class="font-semibold"
                required
              >
                <Input
                  class="w-full"
                  placeholder="A brief description"
                  v-model="state.description"
                />
              </FormField>
              <!-- the button -->
              <Button
                type="submit"
                class="w-full flex items-center justify-center"
                >Add Income</Button
              >
            </Form>
          </template>
        </ReuseableModal>
      </div>
    </div>
    <!-- the  Income table -->
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
    <!-- the users income table - STOP -->
  </section>
</template>

<style scoped></style>
