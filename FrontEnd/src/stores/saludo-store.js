import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useStateSaludo = defineStore("saludo", () => {
  const login = async (email, password) => {
    try {
      const result = await api.post("/token", {
        email,
        password,
      });
      window.localStorage.setItem("data", JSON.stringify(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const listaCards = async () => {
    try {
      const data = await api.get("/todo");
      return data;
    } catch (error) {
      console.log(error);
    }

    // .catch((error) => console.log(error));
  };

  return { login, listaCards };
});
