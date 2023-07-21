<template>
  <NavbarMenu>
    <div class="row q-pa-md justify-center">
      <q-uploader
        style="max-width: 300px"
        url="http://localhost:3000/upload"
        label="Restricted to images"
        max-files="1"
        accept=".jpg, image/*"
        @rejected="onRejected"
      />
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card style="width: 15%" class="my-card"> </q-card>
    </div>
  </NavbarMenu>
</template>

<script>
import { api } from "src/boot/axios";
import { LocalStorage } from "quasar";
import NavbarMenu from "../components/NavbarComponent.vue";
import { useQuasar, Notify } from "quasar";
import { useStateSaludo } from "src/stores/saludo-store";
const userData = useStateSaludo();
export default {
  components: { NavbarMenu },

  data() {
    return {};
  },

  computed: {
    photoList() {
      userData.allPhotos();
      console.log(userData.allphotoUser, "johan");
      return null;
    },
  },
};
</script>
