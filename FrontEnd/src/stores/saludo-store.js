import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { LocalStorage } from "quasar";

export const useStateSaludo = defineStore("saludo", () => {
  const userName = ref(null);
  const userRole = ref(null);
  const userToken = ref(null);
  const userData = ref(null);
  const imgUrlProfile = ref(null);

  const loginUser = async (email, password) => {
    try {
      const token = await api.post("/token", {
        email,
        password,
      });

      LocalStorage.set("name", token.data.name);
      LocalStorage.set("token", token.data.token);
      LocalStorage.set("role", token.data.role);
      LocalStorage.set("data", token.data);
      userName.value = LocalStorage.getItem("name");
      userRole.value = LocalStorage.getItem("role");
      userToken.value = LocalStorage.getItem("token");
      userData.value = LocalStorage.getItem("data");
      // dowloadprofile();
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (
    type_identification,
    identification,
    name,
    lastname,
    email,
    phone,
    role,
    ocupation,
    password
  ) => {
    try {
      const result = await api.post("/crear", {
        type_identification,
        identification,
        name,
        lastname,
        email,
        phone,
        role,
        ocupation,
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

  return {
    loginUser,
    register,
    listaCards,
    dowloadprofile,

    userName,
    userRole,
    userToken,
    imgUrlProfile,
    userData,
  };
});
