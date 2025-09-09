<script setup lang="ts">
// defining the props
defineProps<{
  title: string;
  open: boolean;
}>();
</script>

<template>
  <div>
    <Modal
      :title="title"
      :overlay="true"
      :open="open"
      :close="false"
      :ui="{
        overlay: 'bg-gray-200/50',
        title: 'font-bold text-2xl leading-0',
      }"
    >
      <slot name="modal-button"></slot>
      <template #body>
        <!-- the slot for the content of the modal -->
        <slot name="reusable-content"></slot>
      </template>
    </Modal>
  </div>
</template>
