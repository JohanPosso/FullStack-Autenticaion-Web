<template>
  <q-header elevated class="bg-deep-purple-10 text-white">
    <q-toolbar>
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        {{ nameInformation || "Software Company" }}
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
        <router-link to="" @click="logout">
          <q-btn
            v-if="nameInformation"
            style="background: #e70909; color: white"
            label="Logout"
          />
        </router-link>
        <q-btn
          @click="alerta"
          style="background: #e70909; color: white"
          label="prueba"
        />
      </div>
    </q-toolbar>
    <input v-model="inputText" disabled type="text" v-show="true" />
  </q-header>
</template>

<script>
import { ref, computed } from "vue";
import { LocalStorage } from "quasar";
import { useStateSaludo } from "../stores/saludo-store";
export default {
  setup() {
    const alerta = () => {
      console.log("refresh");
      location.reload();
    };
    const data = JSON.parse(LocalStorage.getItem("data") || "{}");
    const inputText = ref("");

    const nameInformation = data.name;

    const logout = () => {
      const role = data.role;
      if (role) {
        LocalStorage.remove("data");
        inputText.value = "";
      }
      this.$router.push("/login");
    };

    return {
      logout,
      nameInformation,
      alerta,
      inputText,
    };
  },
};
</script>
