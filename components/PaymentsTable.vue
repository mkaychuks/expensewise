<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import { useClipboard } from "@vueuse/core";
import type { IncomeResponse } from "~/types/income";

// define the prosps
defineProps<{
  data: IncomeResponse[] | any;
  columns?: TableColumn<IncomeResponse>[];
}>();

// defining the default columns
const defaultColumns: TableColumn<IncomeResponse>[] = [
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
    accessorKey: "description",
    header: "description",
    cell: ({ row }) => {
      return row.getValue("description");
    },
  },
];
</script>

<template>
  <Table
    :data="data"
    :columns="columns || defaultColumns"
    :ui="{
      root: 'border-2 border-gray-300 rounded-md',
      thead: 'uppercase',
      tr: 'border-gray-300',
      tbody: 'border-gray-300 border-t',
    }"
  />
</template>

<style scoped></style>
