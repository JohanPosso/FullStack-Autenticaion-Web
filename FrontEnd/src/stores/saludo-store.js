import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { LocalStorage } from "quasar";
export const useStateSaludo = defineStore("saludo", () => {
  const userName = ref(null);
  const userRole = ref(null);
  const userToken = ref(null);
  const imgUrlProfile = ref(null);
  const allphotoUser = ref(null);

  const loginUser = async (email, password) => {
    try {
      const token = await api.post("/token", {
        email,
        password,
      });
      // userName.value = token.data.name;
      // userRole.value = token.data.role;
      // userToken.value = token.data.token;
      LocalStorage.set("name", token.data.name);
      LocalStorage.set("token", token.data.token);
      LocalStorage.set("role", token.data.role);
      userName.value = LocalStorage.getItem("name");
      userRole.value = LocalStorage.getItem("role");
      userToken.value = LocalStorage.getItem("token");
      dowloadprofile();
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (name, email, role, password) => {
    try {
      const result = await api.post("/crear", {
        name,
        email,
        role,
        password,
      });
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const listaCards = async () => {
    try {
      const data = await api.get("/todo");
      result(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const dowloadprofile = async () => {
    try {
      const headers = {
        headers: {
          token: `Bearer ${userToken.value}`,
        },
      };
      const response = await api.post("/dowloadprofile", {}, headers);
      LocalStorage.set("profileuser", response.data.ph_reference);
      imgUrlProfile.value = LocalStorage.getItem("profileuser");
    } catch (error) {
      console.log(error);
    }
  };

  const allPhotos = async () => {
    try {
      const headers = {
        headers: {
          token: `Bearer ${userToken.value}`,
        },
      };
      const response = await api.get("/allphoto", headers);
      allphotoUser.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    loginUser,
    register,
    listaCards,
    dowloadprofile,
    allPhotos,
    userName,
    userRole,
    userToken,
    imgUrlProfile,
    allphotoUser,
  };
});
