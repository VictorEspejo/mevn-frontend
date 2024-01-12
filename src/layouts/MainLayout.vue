<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn class="q-mr-sm" to="/">Inicio</q-btn>
        <q-btn class="q-mr-sm" color="green" v-if="!userStore.token" to="/login">Log in</q-btn>
        <q-btn class="q-mr-sm" color="orange" v-if="!userStore.token" to="/signin">Sign In</q-btn>
        <q-btn class="q-mr-sm" color="red" v-else @click="logOut">LogOut</q-btn>
        <q-btn class="q-mr-sm" color="orange" v-if="userStore.token" to="/link">Crear link</q-btn>
        <q-btn v-if="userStore.token" to="/protected">Protected</q-btn>
        <q-btn color="yellow" v-if="userStore.token" to="/links">Links</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from 'src/stores/user-store'
import { useRouter } from 'vue-router';
const leftDrawerOpen = ref(false)


const userStore = useUserStore();
const router = useRouter();

const logOut = () => {
  userStore.logOut();
  router.push("/login")
}
function toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
</script>
