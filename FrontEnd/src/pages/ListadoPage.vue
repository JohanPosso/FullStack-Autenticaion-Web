<template>
  <NavbarMenu>
    <div class="row q-pa-lg justify-center" style="margin-top: 85rem">
      <SidebarMenuAkahon> </SidebarMenuAkahon>
      <q-row class="row q-gutter-lg justify-center">
        <q-col
          v-for="(data, index) in allPhotosJohan"
          :key="data.id_photo"
          cols="6"
          md="4"
        >
          <CardComponent>
            <div class="cards" style="min-height: 15rem">
              <article class="card card--1">
                <q-img
                  :src="data.ph_reference"
                  width="100%"
                  style="position: absolute"
                  alt=""
                />

                <a href="#" class="card_link">
                  <div class="card__img--hover"></div>
                </a>
                <div class="card__info">
                  <q-rating
                    v-model="likes[index]"
                    :key="data.id_photo"
                    :data-set="data.id_photo"
                    max="1"
                    size="2em"
                    color="red"
                    color-selected="red-9"
                    icon="favorite_border"
                    icon-selected="favorite"
                    icon-half="favorite"
                    no-dimming
                    @click="saveLikesToLocalStorage"
                  />

                  <!-- Tiempo Icon -->

                  <!-- Editar Icon -->
                  <i style="font-size: 2em" class="icon-delete material-icons"
                    >delete</i
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
    const likes = ref([]);
    const storedLikes = LocalStorage.getItem("likes");
    if (storedLikes) {
      likes.value = JSON.parse(storedLikes);
    }
    // Método para guardar el estado de "me gusta" en el LocalStorage
    const saveLikesToLocalStorage = () => {
      LocalStorage.set("likes", JSON.stringify(likes.value));
    };
    return {
      allPhotosJohan,
      likes,
      saveLikesToLocalStorage,
    };
  },
  watch: {
    // Guardar el estado de "me gusta" en el LocalStorage cuando cambie
    likes: "saveLikesToLocalStorage",
  },
};
</script>

<style scoped>
.icon-delete {
  visibility: hidden;
}

.cards :hover .icon-delete {
  visibility: visible;
}
</style>
