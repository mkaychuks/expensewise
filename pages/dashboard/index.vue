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
const { totalIncome, totalExpense, balance, recentTransactionData } =
  storeToRefs(incomeStore);
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
          <h2 class="font-bold text-2xl">
            NGN {{ Number(totalIncome).toLocaleString() }}
          </h2>
          <small class="text-green-600 font-semibold">+5%</small>
        </div>
      </Card>
      <!-- card 2 -->
      <Card class="bg-[#EDEDED] w-full md:max-w-sm" variant="soft">
        <div>
          <p class="font-semibold">Expenses</p>
          <h2 class="font-bold text-2xl">
            NGN {{ Number(totalExpense).toLocaleString() }}
          </h2>
          <small class="text-red-500 font-semibold">-8%</small>
        </div>
      </Card>
      <!-- card 3 -->
      <Card class="bg-[#EDEDED] w-full md:max-w-sm" variant="soft">
        <div>
          <p class="font-semibold">Available Balance</p>
          <h2 class="font-bold text-2xl">
            NGN {{ Number(balance).toLocaleString() }}
          </h2>
          <small class="text-red-500 font-semibold">-8%</small>
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
</template>

<style scoped></style>
