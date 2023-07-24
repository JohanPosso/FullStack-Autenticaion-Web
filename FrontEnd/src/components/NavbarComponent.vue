<template>
  <q-layout view="hHh LpR fff">
    <q-header elevated class="bg-deep-purple-10 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          {{ tittleName || "Empresas Spyware" }}
        </q-toolbar-title>
        <div class="q-gutter-xs">
          <router-link to="/login">
            <q-btn
              v-if="!roleUser"
              style="background: #10a97e; color: white"
              label="Login"
            />
          </router-link>
          <router-link to="/register">
            <q-btn
              v-if="!roleUser"
              style="background: #cc6f0d; color: white"
              label="Register"
            />
          </router-link>

          <i
            class="bx"
            :class="'bx-user'"
            style="font-size: 25px; cursor: pointer"
          />
          <q-menu>
            <div class="row no-wrap q-pa-sm">
              <div class="column">
                <div class="text-h6 q-mb-md">Settings</div>
                <q-toggle
                  @click="darkMode"
                  v-model="darkmode"
                  label="Dark Mode"
                />
                <q-toggle v-model="bluetooth" label="Bluetooth" />
              </div>

              <q-separator vertical inset class="q-mx-lg" />

              <div class="column items-center">
                <q-avatar size="72px">
                  <q-img :src="urlImage || '/profiledefault.png'"></q-img>
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">
                  {{ tittleName }}
                </div>
                <router-link to="/login">
                  <q-btn
                    @click="logoutUser"
                    color="negative"
                    label="Logout"
                    push
                    size="sm"
                  />
                </router-link>
              </div>
            </div>
          </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <slot></slot>
    </q-page-container>
  </q-layout>
</template>

<script>
import { LocalStorage, Dark, Notify, Cookies } from "quasar";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";
import { useStateSaludo } from "src/stores/saludo-store";

const userData = useStateSaludo();
const expireToken = LocalStorage.getItem("data");
export default {
  name: "NavbarMenu",
  created() {
    if (expireToken.expiresIn * 1000 < Date.now()) {
      // El token ha expirado
      Notify.create({
        type: "negative",
        timeout: 6000,
        message: "Su sesión ha expirado",
      });
      LocalStorage.clear();
      Cookies.remove("token");

      this.$router.push("/login");
    }
  },
  methods: {
    async logoutUser() {
      try {
        LocalStorage.clear();
        await api.post("/logout");
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    tittleName() {
      const userName = computed(() => LocalStorage.getItem("name"));
      return userName.value;
    },
    roleUser() {
      const userRole = computed(() => LocalStorage.getItem("role"));
      return userRole.value;
    },

    urlImage() {
      const profilePicture = computed(() =>
        LocalStorage.getItem("profileuser")
      );
      return profilePicture.value;
    },
    darkMode() {
      return () => {
        this.darkmode ? Dark.set(true) : Dark.set(false);
        LocalStorage.set("darkmode", this.darkmode);
      };
    },
  },
};
</script>
