<template>
  <q-page class="flex flex-center">
    <q-btn @click="userStore.access">Ingresar</q-btn>
    <q-btn @click="userStore.logOut">Logout</q-btn>
    <q-btn @click="createLink">Crear link</q-btn>
    <div>
      <div>{{ userStore.token }}</div>
      <div>{{ userStore.expiresIn }}</div>
    </div>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { useUserStore } from "src/stores/user-store";

const userStore = useUserStore();

const createLink = async () => {
  try {
    const { data } = await api({
      method: "post",
      url: "/links/",
      headers: {
        Authorization: "Bearer ".concat(token.value),
      },
      data: {
        longLink: "https://amazon.com",
      },
    });
  } catch (error) {
    console.error(error);
  }
};
</script>
