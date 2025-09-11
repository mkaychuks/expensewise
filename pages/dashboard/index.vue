<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
useHead({
  title: "Expensewise | Dashboard",
});

// states, stores and composables
const currentUser = useCurrentUser();
const incomeStore = useIncomeStore();
const { totalIncome, totalExpense } = storeToRefs(incomeStore);

// testing things
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
</script>

<template>
  <section class="md:py-6 py-4">
    <!-- the salutation -->
    <div class="flex flex-col items-start">
      <h1 class="font-bold text-3xl">Dashboard</h1>
      <p class="text-secondary text-sm mb-3">
        Welcome back, {{ capitalize(currentUser?.displayName!) }}
      </p>
    </div>
    <!-- the cards -->
    <div class="flex items-center gap-4">
      <!-- card 1 -->
      <Card class="bg-[#EDEDED] w-full md:max-w-sm" variant="soft">
        <div>
          <p class="font-semibold">Income</p>
          <h2 class="font-bold text-2xl">${{ totalIncome }}</h2>
          <small class="text-green-600 font-semibold">+5%</small>
        </div>
      </Card>
      <!-- card 2 -->
      <Card class="bg-[#EDEDED] w-full md:max-w-sm" variant="soft">
        <div>
          <p class="font-semibold">Expenses</p>
          <h2 class="font-bold text-2xl">${{ totalExpense }}</h2>
          <small class="text-red-500 font-semibold">-8%</small>
        </div>
      </Card>
    </div>
    <!-- the recent transactions -->
    <div class="mt-6">
      <h1 class="font-bold text-2xl mb-4">Recent Transactions</h1>
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
    </div>
  </section>
</template>

<style scoped></style>
