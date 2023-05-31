<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="auto"
  >
    <v-card
      color="primary"
    >
      <v-card-text>
        {{ cProps.title }}
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: boolean,
  title: string
}

const cProps = withDefaults(defineProps<Props>(), {
  title: 'Please wait...'
});

const emit = defineEmits(['update:modelValue']);

const dialog = computed({
  get () {
    return cProps.modelValue;
  },
  set (val) {
    emit('update:modelValue', val);
  }
});
</script>
