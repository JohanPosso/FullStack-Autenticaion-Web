import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";
import { LocalStorage } from "quasar";

export const useStateSaludo = defineStore("saludo", () => {
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

  const dataMemory = () => {
    const data = JSON.parse(LocalStorage.getItem("data"));
    return data;
  };
  return { register, listaCards, dataMemory };
});
