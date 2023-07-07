<template>
  <div>
    <q-page padding class="row justify-center">
      <div class="col-12 col-md-4 col-sm-6">
        <q-card class="my-card">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Titulo</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </div>
</template>

<script>
import { useStateSaludo } from "../stores/saludo-store";
const usertListado = async () => {
  const result = (await useStateSaludo().listaCards()).data;
  return result;
};

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
    };
  },
  methods: {
    logout() {
      if (this.Authenticated()) {
        localStorage.removeItem("data");
      }
      this.$router.push("/login");
    },
  },
};
</script>
