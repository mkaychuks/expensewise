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

// the zod schema
const schema = z.object({
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Amount should not be less than 0",
  }),
  category: z.string().nonempty("Please select a category"),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .refine((val) => new Date(val) <= new Date(), {
      message: "Date cannot be in the future",
    }),
  description: z.string().nonempty("Please add a brief description"),
});
type Schema = z.output<typeof schema>;

// the states, stores, composables
const state = reactive<Schema>({
  amount: "",
  category: expenseCategory[0],
  date: "",
  description: "",
});
const openModal = ref(false);
const openAIModal = ref(false);
const toast = useToast();
const items = ref(expenseCategory);
const currentUser = useCurrentUser();
const incomeStore = useIncomeStore();
const { loading, error, expenses, summaryLoading, summary } =
  storeToRefs(incomeStore);

// Methods
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  await incomeStore.addExpense(
    { ...event.data, amount: Number(event.data.amount) },
    currentUser.value?.uid!
  );
  if (error.value) {
    toast.add({
      title: "Error",
      description:
        "Adding of expense failed due to network or due to you exceeding your balance, Please try again.",
      color: "error",
    });
  } else {
    // router.push("/dashboard/income");
    openModal.value = false;
    toast.add({
      title: "Success",
      description: "Your expense has been added successfully.",
      color: "success",
    });
  }
};

const generateSummary = async () => {
  incomeStore.generateAISummary("expense", expenses.value);
  openAIModal.value = !openAIModal.value;
};
</script>

<template>
  <section class="md:py-6 py-4">
    <!-- the Expense Table - START -->
    <div class="flex items-center justify-between">
      <!-- the left -->
      <div class="flex flex-col items-start">
        <h1 class="font-bold text-3xl">Expenses</h1>
        <p class="text-secondary text-sm mb-3">
          Below are, {{ capitalize(currentUser?.displayName!) }}'s expenses
          history
        </p>
      </div>
      <!-- the right -->
      <div class="flex gap-3 items-center">
        <!-- category modal -->
        <ReuseableModal title="AI Summary of your expenses" :open="openAIModal">
          <template #modal-button>
            <Button
              @click="generateSummary"
              class="text-base font-normal"
              leading-icon="lucide:square-menu"
              >Generate Summary</Button
            >
          </template>
          <template #reusable-content>
            <div
              class="w-64 mx-auto h-64 flex items-center justify-center"
              v-if="summaryLoading"
            >
              <Lottie name="thinking" />
            </div>
            <div v-else>
              <p class="mb-4 font-medium">{{ summary }}</p>
              <Button
                @click="openAIModal = !openAIModal"
                class="w-full flex items-center justify-center"
                color="secondary"
                >Close</Button
              >
            </div>
          </template>
        </ReuseableModal>
        <!-- the transaction modal and its content -->
        <ReuseableModal title="Add an Expense" :open="openModal">
          <template #modal-button>
            <Button
              @click="openModal = !openModal"
              class="text-base font-normal"
              leading-icon="lucide:circle-dollar-sign"
              >Add Expense</Button
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
                  @keydown="
                    (e: KeyboardEvent) => {
                      const allowedKeys = [
                        'Backspace',
                        'Delete',
                        'Tab',
                        'ArrowLeft',
                        'ArrowRight',
                        'Home',
                        'End',
                      ];
                      // Allow control/navigation keys
                      if (allowedKeys.includes(e.key)) return;
                      // Block non-numeric input
                      if (!/^\d$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }
                  "
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
              <!-- the button -->
              <div class="flex flex-col gap-2">
                <Button
                  @click="openModal = !openModal"
                  class="w-full flex items-center justify-center"
                  color="secondary"
                  >Cancel</Button
                >
                <Button
                  ref="submitButton"
                  type="submit"
                  class="w-full flex items-center justify-center"
                  :loading="loading"
                  >Add Expense</Button
                >
              </div>
            </Form>
          </template>
        </ReuseableModal>
      </div>
    </div>
    <!-- the table -->
    <div class="">
      <PaymentsTable :data="expenses" />
    </div>
    <!-- the Expense Table - STOP -->
  </section>
</template>

<style scoped></style>
