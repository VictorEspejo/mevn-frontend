<template>
    <h3>Create link: </h3>
    <q-form @submit="submitForm">
        <q-input outlined v-model="linkValue" label="link name" class="q-mb-sm"></q-input>
        <q-btn label="Enviar" type="submit" color="green"></q-btn>
    </q-form>
</template>


<script setup>
    import { ref } from "vue";
    const linkValue = ref();
    const emits = defineEmits(["createLink"])

    const submitForm = () => {
        emits("createLink", linkValue);
    }
</script>