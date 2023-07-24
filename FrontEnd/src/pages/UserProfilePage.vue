<template>
  <NavbarComponent>
    <div class="row q-pa-sm justify-center">
      <SidebarMenuAkahon></SidebarMenuAkahon>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-xl-6 col-md-12">
              <div class="cardt user-card-full">
                <div class="row m-l-0 m-r-0">
                  <div class="col-sm-4 bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div class="m-b-25">
                        <q-img
                          :src="profileUser"
                          class="img-radius"
                          alt="User-Profile-Image"
                        />
                        <div>{{ dataUser.ocupation }}</div>
                      </div>
                      <q-btn>Cambiar imagen</q-btn>
                      <i
                        class="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"
                      ></i>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="card-block">
                      <h5 class="m-b-20 p-b-5 b-b-default f-w-600">
                        Informacion del usuario
                      </h5>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Tipo Identificacion</p>
                          <h6 class="text-muted f-w-400">
                            {{ dataUser.type_identification }}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Identificacion</p>
                          <h6 class="text-muted f-w-400">
                            {{ dataUser.identification }}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Nombre</p>
                          <h6 class="text-muted f-w-400">
                            {{ dataUser.name }}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Apellido</p>
                          <h6 class="text-muted f-w-400">
                            {{ dataUser.lastname }}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Email</p>
                          <h6 class="text-muted f-w-400">
                            {{ dataUser.email }}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Telefono</p>
                          <h6 class="text-muted f-w-400">
                            {{ dataUser.phone }}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Role</p>
                          <h6 class="text-muted f-w-400">
                            {{ dataUser.role }}
                          </h6>
                        </div>
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Ocupación</p>
                          <h6 class="text-muted f-w-400">
                            {{ dataUser.ocupation }}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NavbarComponent>
</template>

<script>
import NavbarComponent from "src/components/NavbarComponent.vue";
import SidebarMenuAkahon from "src/components/Sidebar-menu-akahon.vue";
import { useStateSaludo } from "src/stores/saludo-store";
import { computed } from "vue";
import PruebaPage from "./PruebaPage.vue";
import { LocalStorage } from "quasar";
const data = useStateSaludo();
export default {
  name: "EditUserProfile",
  components: { NavbarComponent, SidebarMenuAkahon },

  computed: {
    dataUser() {
      const userData = computed(() => LocalStorage.getItem("data"));
      return userData.value;
    },
    profileUser() {
      const userProfile = computed(() => LocalStorage.getItem("profileuser"));
      return userProfile.value;
    },
  },
};
</script>

<style>
.padding {
  padding: 3rem !important;
}

.user-card-full {
  overflow: hidden;
}

.cardt {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  border: none;
  margin-bottom: 30px;
  box-shadow: 2px 2px 3px rgb(34, 36, 36);
  color: #ee5a6f;
}

.m-r-0 {
  margin-right: 0px;
}

.m-l-0 {
  margin-left: 0px;
}

.user-card-full .user-profile {
  border-radius: 5px 0 0 5px;
}

.bg-c-lite-green {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#f29263),
    to(#ee5a6f)
  );
  background: linear-gradient(to right, #311b92, #f29263);
}

.user-profile {
  padding: 20px 0;
}

.card-block {
  padding: 1.25rem;
}

.m-b-25 {
  margin-bottom: 25px;
}

.img-radius {
  border-radius: 5px;
  width: 50%;
}

h6 {
  font-size: 14px;
}

.cardt .card-block p {
  line-height: 25px;
}

@media only screen and (min-width: 1400px) {
  p {
    font-size: 14px;
  }
}

.card-block {
  padding: 1.25rem;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.m-b-20 {
  margin-bottom: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.cardt .card-block p {
  line-height: 25px;
}

.m-b-10 {
  margin-bottom: 10px;
}

.text-muted {
  color: #000000 !important ;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.f-w-600 {
  font-weight: 600;
}

.m-b-20 {
  margin-bottom: 20px;
}

.m-t-40 {
  margin-top: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.m-b-10 {
  margin-bottom: 10px;
}

.m-t-40 {
  margin-top: 20px;
}

.user-card-full .social-link li {
  display: inline-block;
}

.user-card-full .social-link li a {
  font-size: 20px;
  margin: 0 10px 0 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
</style>
