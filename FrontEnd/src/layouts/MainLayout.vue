<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-deep-purple-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ nameInformation() || "Software Company" }}
        </q-toolbar-title>
        <div class="q-gutter-xs">
          <router-link to="/login">
            <q-btn
              v-if="!nameInformation()"
              style="background: #10a97e; color: white"
              label="Login"
            />
          </router-link>
          <router-link to="/register">
            <q-btn
              v-if="!nameInformation()"
              style="background: #cc6f0d; color: white"
              label="Register"
            />
          </router-link>
          <router-link to="" @click="logout">
            <q-btn
              v-if="nameInformation()"
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
const data = JSON.parse(localStorage.getItem("data"));

export default {
  methods: {
    logout() {
      const role = data?.role;
      if (role) {
        localStorage.removeItem("data");
      }
      this.$router.push("/login");
    },
    nameInformation() {
      const name = data?.name;
      if (name) {
        return name;
      }
    },
  },
  computed: {
    toby() {
      return this.nameInformation;
    },
  },
};
</script>
