<template>
  <q-page padding class="row justify-center">
    <q-img src="/neon.png" class="" style="width: 50%" />

    <div class="col-12 col-md-4 col-sm-6 q-gutter-xl">
      <div class="q-pa-md" style="max-width: 400px; text-align: center">
        <q-img src="/retrato.png" class="" style="width: 50%" />
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            filled
            v-model="email"
            label="Your email *"
            hint="email"
            lazy-rules
          />

          <q-input
            filled
            type="text"
            v-model="password"
            label="Password"
            lazy-rules
          />

          <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

          <div>
            <q-btn
              @click="redirect"
              label="Iniciar sesion"
              type="submit"
              color="primary"
            />

            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { LocalStorage, Loading, Notify } from "quasar";
import { api } from "src/boot/axios";
import { useStateSaludo } from "src/stores/saludo-store";
const userData = useStateSaludo();
export default {
  data() {
    const email = ref("johan@hotmail.com");
    const password = ref("123");
    const onSubmit = async () => {
      setTimeout(() => {
        if (userData.userRole) {
          Loading.show();

          Notify.create({
            type: "positive",
            timeout: 2000,
            message: "Usuario logueado exitosamente!",
          });
          Loading.hide();
          this.$router.push("/listado");
        }
      }, 1000);
    };

    const onReset = () => {
      email.value = null;
      password.value = null;
    };

    const redirect = async () => {
      try {
        userData.loginUser(email.value, password.value);
      } catch (error) {
        if (error.response.data.error) {
          Notify.create({
            type: "negative",
            timeout: 2000,
            message: error.response.data.error,
          });
          console.log(error);
        }
      }
    };

    return {
      email,
      password,
      onSubmit,
      onReset,
      redirect,
    };
  },
};
</script>
