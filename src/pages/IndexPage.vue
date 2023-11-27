<template>
  <q-page class="flex flex-center">
    <q-btn @click="access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear link</q-btn>
    <div>
      <div v-if="token">{{ token }}</div>
      <div v-if="expiresIn">{{ expiresIn }}</div>
    </div>
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";

const token = ref("");
const expiresIn = ref("");

const access = async () => {
  try {
    const {
      data: { token: userToken },
    } = await api.post("/auth/login", {
      email: "userv1@gmail.com",
      password: "123456",
    });

    console.log(userToken);

    token.value = userToken.token;
    expiresIn.value = userToken.expiresIn;
    setTime()
  } catch (error) {
    console.error(error);
  }
};

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
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const refreshToken = async () => {
  try {
    const {
      data: { token: userToken },
    } = await api.get("/auth/refresh");
    if (userToken) {
      console.log(userToken);
      token.value = userToken.token;
      expiresIn.value = userToken.expiresIn;
    }
    setTime();
  } catch (error) {
    console.error(error);
  }
};

const setTime = () => {
  setTimeOut(refreshToken, expiresIn.value * 1000 - 6000);
}

refreshToken();
</script>
