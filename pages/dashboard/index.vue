<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const currentUser = useCurrentUser();

// testing things
const data = ref([
  {
    id: "4600",
    date: "2024-03-11T15:30:00",
    status: "paid",
    email: "james.anderson@example.com",
    amount: 594,
  },
  {
    id: "4599",
    date: "2024-03-11T10:10:00",
    status: "failed",
    email: "mia.white@example.com",
    amount: 276,
  },
  {
    id: "4598",
    date: "2024-03-11T08:50:00",
    status: "refunded",
    email: "william.brown@example.com",
    amount: 315,
  },
  {
    id: "4597",
    date: "2024-03-10T19:45:00",
    status: "paid",
    email: "emma.davis@example.com",
    amount: 529,
  },
  {
    id: "4596",
    date: "2024-03-10T15:55:00",
    status: "paid",
    email: "ethan.harris@example.com",
    amount: 639,
  },
]);

// chart
const RevenueData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const RevenueCategories = computed(() => ({
  desktop: {
    name: "Desktop",
    color: "#22c55e",
  },
}));

const xFormatter = (i: number): string => `${RevenueData[i]?.month}`;
const yFormatter = (tick: number) => tick.toString();
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
      <Card class="bg-gray-300 w-full md:max-w-sm" variant="soft">
        <div>
          <p>Income</p>
          <h2>5,000</h2>
          <small>+5%</small>
        </div>
      </Card>
      <!-- card 2 -->
      <Card class="bg-gray-300 w-full md:max-w-sm" variant="soft">
        <div>
          <p>Income</p>
          <h2>5,000</h2>
          <small>+5%</small>
        </div>
      </Card>
    </div>
    <!-- the recent transactions -->
    <div class="mt-6">
      <h1 class="font-bold text-3xl mb-4">Recent Transactions</h1>
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

        <BarChart
          :data="RevenueData"
          :height="300"
          :categories="RevenueCategories"
          :y-axis="['desktop']"
          :x-num-ticks="6"
          :radius="4"
          :y-grid-line="true"
          :x-formatter="xFormatter"
          :y-formatter="yFormatter"
          :legend-position="LegendPosition.Top"
          :hide-legend="false"
          class="max-w-lg"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
