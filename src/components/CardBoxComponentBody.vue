<script setup>
defineProps({
  noPadding: Boolean,
  classType: {
    type: String,
    default: 'dark',
  },
})
</script>

<template>
  <div :class="classType == 'dark' ? 'flex-1 rounded-lg bg-slate-900 p-6' : 'flex-1 rounded-lg bg-white p-6'">
    <slot />
  </div>
</template>
