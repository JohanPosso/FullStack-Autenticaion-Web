<template>
  <q-page padding class="row justify-center">
    <q-img src="/brap.png" class="" style="width: 50%" />
    <div
      class="col-12 col-md-4 col-sm-6 q-gutter-xl"
      style="align-self: center"
    >
      <q-form @submit.prevent="onSubmit" @reset="onReset" class="text-center">
        <!-- <q-img src="/triangulo.png" class="" style="width: 50%" /> -->
        <q-input
          filled
          v-model="type_identification"
          label="Your type_identification *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') ||
              'Please type your type_identification',
          ]"
        />

        <q-input
          filled
          v-model="identification"
          label="Your identification *"
          lazy-rules
          :rules="[
            (val) =>
              (val !== null && val !== '') || 'Please type your identification',
          ]"
        />

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
          v-model="lastname"
          label="Your lastname *"
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
        <q-input
          filled
          type="phone"
          v-model="phone"
          label="Your phone *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
          ]"
        />

        <q-select filled v-model="role" :options="options" label="Role" />
        <br />
        <q-input
          filled
          type="ocupation"
          v-model="ocupation"
          label="Your ocupation *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
          ]"
        />

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
      type_identification: null,
      identification: null,
      name: null,
      lastname: null,
      email: null,
      phone: null,
      role: null,
      ocupation: null,
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
      userData.register(
        this.type_identification,
        this.identification,
        this.name,
        this.lastname,
        this.email,
        this.phone,
        this.role,
        this.ocupation,
        this.password
      );
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
