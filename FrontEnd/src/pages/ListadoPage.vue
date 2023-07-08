<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="(data, index) in prueba()" :key="index" class="my-card">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">{{ data.name }}</div>
        <div class="text-subtitle2">{{ data.email }}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { api } from "src/boot/axios";

export default {
  data() {
    return {
      Authenticated() {
        const data = JSON.parse(localStorage.getItem("data"));
        const role = data?.role;
        if (role) {
          return role;
        }
      },
      datosApi: [],
    };
  },
  async created() {
    const response = await api.get("/todo");
    this.datosApi = response.data;
  },

  methods: {
    logout() {
      if (this.Authenticated()) {
        localStorage.removeItem("data");
      }
      this.$router.push("/login");
    },
    prueba() {
      const datos = this.datosApi.map((e) => {
        return {
          id: e.id,
          name: e.name,
          email: e.email,
          createdAt: e.createdAt,
        };
      });
      return datos;
    },
  },
};
</script>
