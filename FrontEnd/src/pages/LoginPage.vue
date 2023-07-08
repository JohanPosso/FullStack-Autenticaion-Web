<template>
  <q-page padding class="row justify-center">
    <q-img src="../../public/neon.png" class="" style="width: 50%" />

    <div class="col-12 col-md-4 col-sm-6 q-gutter-xl">
      <div class="q-pa-md" style="max-width: 400px; text-align: center">
        <q-img src="../../public/retrato.png" class="" style="width: 50%" />
        <q-form @submit.prevent="redirect" class="q-gutter-md">
          <q-input
            filled
            v-model="name"
            label="Your name *"
            hint="Name"
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
              @click="onSubmit"
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
import { useStateSaludo } from "../stores/saludo-store";
import { useQuasar } from "quasar";

export default {
  data() {
    // $q.dark.toggle();
    return {
      name: null,
      password: null,
    };
  },
  methods: {
    onSubmit() {
      this.$q.loading.show({
        delay: 400, // ms
      });

      setTimeout(() => {
        this.redirect();
        this.$q.loading.hide();
      }, 500);
      const userData = useStateSaludo();
      userData.login(this.name, this.password);
    },
    onReset() {
      this.name = null;
      this.password = null;
    },
    redirect() {
      setTimeout(() => {
        this.$router.push("/listado");
      }, 700);
    },
  },
};
</script>
