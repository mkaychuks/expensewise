<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import { useClipboard } from "@vueuse/core";
import type { IncomeResponse } from "~/types/income";

// resolving the NuxtUI components
const Button = resolveComponent("Button");
const Badge = resolveComponent("Badge");
const DropdownMenu = resolveComponent("DropdownMenu");

const toast = useToast();
const { copy } = useClipboard();

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
  {
    id: "actions",
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-right" },
        h(
          DropdownMenu,
          {
            content: { align: "end" },
            items: getRowItems(row),
            "aria-label": "Actions dropdown",
          },
          () =>
            h(Button, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
              "aria-label": "Actions dropdown",
            })
        )
      );
    },
  },
];

// row menu items
function getRowItems(row: Row<IncomeResponse>) {
  return [
    {
      label: "Copy payment ID",
      onSelect() {
        copy(row.original.id);
        toast.add({
          title: `Payment ID copied to clipboard! ${row.original.id}`,
          color: "success",
          icon: "i-lucide-circle-check",
        });
      },
    },
    { label: "View customer" },
    { label: "View payment details" },
  ];
}
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
