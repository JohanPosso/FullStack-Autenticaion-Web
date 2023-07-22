<template>
  <NavbarMenu>
    <div class="row q-pa-lg justify-center">
      <SidebarMenuAkahon> </SidebarMenuAkahon>
      <q-row class="row q-gutter-lg justify-center">
        <q-col
          v-for="data in allPhotosJohan"
          :key="data.id_photo"
          cols="6"
          md="4"
        >
          <CardComponent>
            <div class="cards">
              <article class="card card--1">
                <q-img :src="data.ph_reference" width="100%" alt="" />

                <a href="#" class="card_link">
                  <div class="card__img--hover"></div>
                </a>
                <div class="card__info">
                  <q-rating
                    v-model="model3"
                    max="1"
                    size="2em"
                    color="red"
                    color-selected="red-9"
                    icon="favorite_border"
                    icon-selected="favorite"
                    icon-half="favorite"
                    no-dimming
                  />
                  <br />

                  <!-- Tiempo Icon -->
                  <span class="material-symbols-outlined"> delete </span>
                  <!-- Editar Icon -->
                  <span class="card__by"
                    >by
                    <a href="#" class="card__author" title="author">{{
                      data.userCreator
                    }}</a></span
                  >
                </div>
              </article>
            </div>
          </CardComponent>
        </q-col>
      </q-row>
    </div>
  </NavbarMenu>
</template>

<script>
import { api } from "src/boot/axios";
import { LocalStorage } from "quasar";
import NavbarMenu from "../components/NavbarComponent.vue";
import { useQuasar, Notify } from "quasar";
import { useStateSaludo } from "src/stores/saludo-store";
import SidebarMenuAkahon from "src/components/Sidebar-menu-akahon.vue";
import CardComponent from "../components/CardComponent.vue";
import { computed, ref } from "vue";
import { useStatePhotos } from "src/stores/photo-store";
import { data } from "autoprefixer";
const userData = useStateSaludo();
export default {
  components: { NavbarMenu, SidebarMenuAkahon, CardComponent },
  created() {
    const allphotoUser = async () => {
      try {
        const headers = {
          headers: {
            token: `Bearer ${LocalStorage.getItem("token")}`,
          },
        };
        const photos = await api.get("/allphoto", headers);
        console.log(photos.data);
        this.allPhotosJohan = photos.data;
      } catch (error) {
        console.log(error);
      }
    };
    allphotoUser();
    return { allphotoUser };
  },
  data() {
    const allPhotosJohan = ref(null);
    return {
      allPhotosJohan,
      // productList: [
      //   // Aquí puedes definir los datos de tus productos, por ejemplo:
      //   { name: "Producto 1", price: 10 },
      //   { name: "Producto 2", price: 15 },
      //   { name: "Producto 2", price: 15 },
      //   { name: "Producto 2", price: 15 },
      //   { name: "Producto 2", price: 15 },
      //   { name: "Producto 2", price: 15 },
      //   { name: "Producto 2", price: 15 },
      //   // ...
      // ],
    };
  },

  computed: {
    photoList() {
      return null;
    },
  },
};
</script>
