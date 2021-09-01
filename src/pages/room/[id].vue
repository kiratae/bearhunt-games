<script setup lang="ts">
const props = defineProps<{ id: string }>()
const { t } = useI18n()
</script>

<template>
  RoomId: {{ props.id }}
</template>
