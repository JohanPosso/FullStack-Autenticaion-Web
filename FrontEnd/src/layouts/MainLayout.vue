<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-deep-purple-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ inputText || "Software Company" }}
        </q-toolbar-title>
        <div class="q-gutter-xs">
          <router-link to="/login">
            <q-btn
              v-if="!nameInformation"
              style="background: #10a97e; color: white"
              label="Login"
            />
          </router-link>
          <router-link to="/register">
            <q-btn
              v-if="!nameInformation"
              style="background: #cc6f0d; color: white"
              label="Register"
            />
          </router-link>
          <router-link to="/dashboard">
            <q-btn
              v-if="nameInformation"
              style="background: #a809e7; color: white"
              label="Dashboard"
            />
          </router-link>
          <router-link to="" @click="logout">
            <q-btn
              v-if="nameInformation"
              style="background: #e70909; color: white"
              label="Logout"
            />
          </router-link>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, computed } from "vue";
import { LocalStorage } from "quasar";
import { useStateSaludo } from "../stores/saludo-store";
import { useRouter } from "vue-router";

export default {
  setup() {
    const data = JSON.parse(LocalStorage.getItem("data") || "{}");

    const nameInformation = computed(() => data.name);
    const router = useRouter();
    const logout = () => {
      const role = data.role;
      if (role) {
        LocalStorage.remove("data");
        data.name = "";
      }
      router.push("/login");
    };

    const alerta = () => {
      console.log(nombreUser);
    };

    return {
      logout,
      nameInformation,
      alerta,
    };
  },
};
</script>
