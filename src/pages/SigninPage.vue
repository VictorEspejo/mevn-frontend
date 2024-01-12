<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Register</h3>
      <q-form @submit.prevent="submitForm">
        <q-input
          v-model="username"
          label="Email"
          type="email"
          :rules="[
            (val) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val) || 'Introduce una dirección de correo electrónico válida',
            (val) => val.length > 5 || 'Password must be at least 6 characters',
          ]"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          :rules="[
            (val) => val.length > 5 || 'Password must be at least 6 characters',
          ]"
        />
        <q-input
          v-model="repassword"
          label="Re-enter Password"
          type="password"
          :disabled="!password"
          :rules="[
            (val) => val === password || 'Passwords do not match',
          ]"
        />
        <q-btn type="submit" label="Register" color="primary" />
      </q-form>
    </div>

    <q-dialog v-model="showErrorDialog">
      <q-card>
        <q-card-section class="text-danger">
          Error de validación
        </q-card-section>
        <q-card-section>
          Por favor, introduce credenciales válidas.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cerrar" color="primary" @click="showErrorDialog = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { useUserStore } from "stores/user-store";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const username = ref("");
const password = ref("");
const repassword = ref("");
const showErrorDialog = ref(false);

const submitForm = async () => {
  try {
    if (password.value !== repassword.value) {
      showErrorDialog.value = true;
      return;
    }
    await userStore.register(username.value, password.value, repassword.value);
    router.push("/");
  } catch (error) {
    showErrorDialog.value = true;
    password.value = "";
    repassword.value = "";
  }
};
</script>
