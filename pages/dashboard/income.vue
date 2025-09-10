<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import type { IncomeResponse } from "~/types/income";

// page Meta and configs
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});
useHead({
  title: "Expensewise | Transactions",
});

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

// the states and composables
const state = reactive<Schema>({
  amount: "",
  category: "Backlog",
  date: "",
  description: "",
});
const openModal = ref(false);
const toast = useToast();
const items = ref(incomeCategory);
const currentUser = useCurrentUser(); // get the current user
const incomeStore = useIncomeStore();
const { incomes } = storeToRefs(incomeStore);
const { loading, error } = storeToRefs(incomeStore);

// Methods
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  await incomeStore.addIncome(
    { ...event.data, amount: Number(event.data.amount) },
    currentUser.value?.uid!
  );
  if (error.value) {
    toast.add({
      title: "Error",
      description: "Adding of income failed, Please try again.",
      color: "error",
    });
    console.log(error.value);
  } else {
    // router.push("/dashboard/income");
    openModal.value = false;
    toast.add({
      title: "Success",
      description: "Your income has been added successfully.",
      color: "success",
    });
  }
};

// computed
const incomesData = computed<IncomeResponse[]>(() => {
  if (!incomes.value) return [];

  const order: (keyof IncomeResponse)[] = [
    "date",
    "category",
    "amount",
    "description",
  ];
  // @ts-ignore
  return incomes.value.map(({ userId, ...rest }) => {
    // rebuild object in the defined order
    const ordered = order.reduce((obj, key) => {
      // @ts-ignore
      obj[key] = rest[key];
      return obj;
    }, {} as IncomeResponse);
    return ordered;
  });
});
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
        <ReuseableModal title="Add Income" :open="openModal">
          <template #modal-button>
            <Button
              @click="openModal = !openModal"
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
                  >Add Income</Button
                >
              </div>
            </Form>
          </template>
        </ReuseableModal>
      </div>
    </div>
    <!-- the  Income table -->
    <div class="">
      <Table
        :data="incomesData"
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
