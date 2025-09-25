<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { TransactionResponse } from "~/types/income";
import { h, resolveComponent } from "vue";

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
const { isDesktop } = useDesktop();

const {
  totalIncome,
  totalExpense,
  balance,
  recentTransactionData,
  percentageChange,
} = storeToRefs(incomeStore);
const Badge = resolveComponent("Badge");

const columns: TableColumn<TransactionResponse>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      return row.getValue("date");
    },
  },
  {
    accessorKey: "category",
    header: "category",
    cell: ({ row }) => {
      return row.getValue("category");
    },
  },
  {
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => {
      return row.getValue("description");
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "NGN",
      }).format(amount);

      return h("div", { class: "font-medium" }, formatted);
    },
  },
  {
    accessorKey: "transaction_Type",
    header: "transaction_Type",
    cell: ({ row }) => {
      const color = {
        income: "success" as const,
        expense: "error" as const,
      }[row.getValue("transaction_Type") as string];

      return h(Badge, { class: "capitalize", variant: "subtle", color }, () =>
        row.getValue("transaction_Type")
      );
    },
  },
];
</script>

<template>
  <section class="md:py-6 py-4" v-if="isDesktop">
    <!-- the salutation -->
    <div class="flex flex-col items-start">
      <h1 class="font-bold text-3xl">Dashboard</h1>
      <p class="text-secondary text-sm mb-3">
        Welcome back, {{ capitalize(currentUser?.displayName!) }}
      </p>
    </div>
    <!-- the cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <!-- card 1 -->
      <Card class="bg-[#EDEDED] w-full md:max-w-sm" variant="soft">
        <div>
          <p class="font-semibold">Income</p>
          <h2 class="font-bold text-2xl">
            NGN {{ Number(totalIncome).toLocaleString() }}
          </h2>
        </div>
      </Card>
      <!-- card 2 -->
      <Card class="bg-[#EDEDED] w-full md:max-w-sm" variant="soft">
        <div>
          <p class="font-semibold">Expenses</p>
          <div class="flex items-center gap-2">
            <h2 class="font-bold text-2xl">
              NGN {{ Number(totalExpense).toLocaleString() }}
            </h2>
            <small class="text-red-500 font-semibold" v-if="Number.isNaN(percentageChange)"
              >-0% of total income</small
            >
            <small class="text-red-500 font-semibold" v-else
              >-{{ percentageChange }}% of total income</small
            >
          </div>
        </div>
      </Card>
      <!-- card 3 -->
      <Card class="bg-[#EDEDED] w-full md:max-w-sm" variant="soft">
        <div>
          <p class="font-semibold">Available Balance</p>
          <h2 class="font-bold text-2xl">
            NGN {{ Number(balance).toLocaleString() }}
          </h2>
        </div>
      </Card>
    </div>
    <!-- the recent transactions -->
    <div class="mt-6">
      <h1 class="font-bold text-2xl mb-4">Recent Transactions</h1>
      <div class="">
        <Table
          :data="recentTransactionData"
          :columns="columns"
          class=""
          :ui="{
            root: 'border-2 border-gray-300 rounded-md',
            thead: 'uppercase',
            tr: 'border-gray-300',
            tbody: 'border-gray-300 border-t',
          }"
        />
      </div>
    </div>
  </section>
  <div class="w-full h-dvh justify-center items-center flex flex-col" v-else>
    <div class="flex gap-1 items-center mb-2">
      <img src="/logo.png" alt="logo" width="30" height="30" />
      <h1>Expensewise</h1>
    </div>
    <p class="leading-tight text-center w-full">
      This app is only available on larger screens.Please rotate your device or
      use a desktop.
    </p>
  </div>
</template>

<style scoped></style>
