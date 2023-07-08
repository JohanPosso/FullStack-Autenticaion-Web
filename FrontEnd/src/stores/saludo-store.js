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

  return { login, register, listaCards };
});
