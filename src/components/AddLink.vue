<script setup>
import { ref, defineEmits } from "vue";

const emits = defineEmits(["link-added"])
const link = ref("");

const addLink = () => {
 emits("link-added", link);
};
</script>

<template>
  <q-form @submit.prevent="addLink">
    <q-input
      v-model="link"
      label="Long Link"
      :rules="[
        (val) =>
          val.startsWith('http://') ||
          val.startsWith('https://') ||
          'Introduce un enlace válido',
      ]"
    />
    <q-btn type="submit" label="Create" color="primary" />
  </q-form>
</template>
