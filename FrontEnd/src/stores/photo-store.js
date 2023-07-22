import { defineStore } from "pinia";
import { LocalStorage } from "quasar";
import { api } from "src/boot/axios";
import { ref } from "vue";

const tokenPrueba = LocalStorage.getItem("token");
export const useStatePhotos = defineStore("photo", () => {
  let userPhoto = null;

  const allphotoUser = async () => {
    try {
      const headers = {
        headers: {
          token: `Bearer ${tokenPrueba}`,
        },
      };
      const photos = await api.get("/allphoto", headers);
      userPhoto = photos.data;
      console.log(photos.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { allphotoUser, userPhoto };
});
