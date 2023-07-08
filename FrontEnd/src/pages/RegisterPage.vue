<template>
  <q-page padding class="row justify-center">
    <q-img src="../../public/brap.png" class="" style="width: 50%" />
    <div
      class="col-12 col-md-4 col-sm-6 q-gutter-xl"
      style="align-self: center"
    >
      <q-form
        @submit.prevent="onSubmit"
        @reset="onReset"
        class="q-gutter-md text-center"
      >
        <q-img src="../../public/triangulo.png" class="" style="width: 50%" />

        <q-input
          filled
          v-model="name"
          label="Your name *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your name',
          ]"
        />

        <q-input
          filled
          type="email"
          v-model="email"
          label="Your email *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
          ]"
        />

        <q-select filled v-model="role" :options="options" label="Role" />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Your password *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
          ]"
        />

        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

        <div>
          <q-btn label="Registrar" type="submit" color="primary" />
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
  </q-page>
</template>

<script>
import { useStateSaludo } from "src/stores/saludo-store";
import { useQuasar } from "quasar";

const userData = useStateSaludo();
export default {
  data() {
    const $q = useQuasar();
    // toggle
    // $q.dark.toggle();
    return {
      name: null,
      email: null,
      role: null,
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
      userData.register(this.name, this.email, this.role, this.password);
    },
    redirect() {
      this.$router.push("/login");
    },
  },
  setup() {
    return {
      options: ["admin", "user"],
    };
  },
};
</script>
