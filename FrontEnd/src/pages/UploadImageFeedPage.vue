<template>
  <NavbarComponent>
    <div class="row q-pa-lg justify-center">
      <SidebarMenuAkahon> </SidebarMenuAkahon>

      <div class="drop-it-hot" id="drop-area">
        <div class="circle">
          <svg
            fill="currentColor"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
          </svg>
        </div>
        <form class="choose-files">
          <div class="button-wrapper">
            <div class="row q-pa-lg justify-center">
              <!-- Arrastre -->
              <div style="width: 100%; height: 18rem" class="drop-zone">
                <div v-if="!isUploading">
                  Arrastra y suelta tus imágenes aquí o haz clic para
                  seleccionar
                </div>
                <span v-else>Cargando imágenes...</span>
              </div>
              <input
                style="height: 46rem; margin-top: -29rem"
                class="sizeupload"
                type="file"
                id="fileInput"
                ref="fileInput"
                @change="handleFileInput"
              />
            </div>
            <!-- Arrastre -->
            <label for="fileInput">Subir Imagen</label>
          </div>
        </form>
        <div id="gallery"></div>
      </div>
    </div>
  </NavbarComponent>
</template>

<script>
import NavbarComponent from "src/components/NavbarComponent.vue";
import SidebarMenuAkahon from "src/components/Sidebar-menu-akahon.vue";
import { LocalStorage, Notify } from "quasar";
import { api } from "src/boot/axios";
import { useStateSaludo } from "src/stores/saludo-store";
const userData = useStateSaludo();
export default {
  components: { NavbarComponent, SidebarMenuAkahon },
  data() {
    return {
      isUploading: false,
    };
  },
  methods: {
    handleDrop(event) {
      event.preventDefault();
      this.uploadFiles(event.dataTransfer.files);
    },
    handleFileInput() {
      this.uploadFiles(this.$refs.fileInput.files);
    },
    async uploadFiles(files) {
      this.isUploading = true;
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("profile", files[i]);
      }
      try {
        const headers = {
          headers: {
            "Content-Type": "multipart/form-data",
            token: `Bearer ${LocalStorage.getItem("token")}`,
          },
        };
        const response = await api.post("/upload", formData, headers);

        if (response.status === 200) {
          Notify.create({
            type: "positive",
            timeout: 3000,
            message: "Imagen subida exitosamente!",
          });
          //   this.$router.push("/listado");
          userData.dowloadprofile();
        } else {
          Notify.create({
            type: "negative",
            timeout: 2000,
            message: "Error al subir imágen",
          });
        }
      } catch (error) {
        Notify.create({
          type: "negative",
          timeout: 2000,
          message: "Error al subir imágen",
        });
        console.error(error);
      } finally {
        this.isUploading = false;
      }
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(0deg, #ebfcff 0%, #ffffff 89%);
  font-family: Roboto, sans-serif;
}
label {
  background-color: indigo;
  color: white;
  padding: 0.5rem;
  font-family: sans-serif;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-top: 1rem;
}
.sizeupload {
  z-index: 50000000000;
  padding: 125px 10px;
  width: 141%;
  margin-left: -101px;
}
.drop-it-hot {
  background-color: #41162a;
  border-radius: 15px;
  width: 700px;
  height: 500px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 15px 0 rgba(black, 0.1);
  overflow: hidden;
}

.drop-it-hot:after {
  content: "";
  position: absolute;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  border: 2px dashed #e6e7f0;
  border-radius: 5px;
  z-index: 0;
}

.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  color: red;
  background-color: white;
  border: 3px solid black;
  width: 100px;
  height: 100px;
}

.circle {
  transition: transform 150ms ease-in;
  z-index: 10;
}

svg {
  width: 40px;
  height: 40px;
}

.circle:before {
  content: "";
  background-color: #2f4982;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  position: absolute;
  opacity: 0;
  transition: transform 250ms ease-in, opacity 200ms ease-in;
  z-index: 0;
}

.circle:after {
  content: "";
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.circle:hover {
  transform: scale(1.2);
  opacity: 0.9;
}

.circle:before {
  transform: scale(8);
  opacity: 1;
}

.circle:after {
  border: 3px solid white;
}

svg {
  color: white;
  z-index: 1;
}

.highlight:before {
  transform: scale(8);
  opacity: 1;
}

.highlight:after {
  border: 3px solid white;
}

svg {
  color: white;
  z-index: 1;
}

.choose-files {
  align-self: flex-end;
  z-index: 10;
}

.button-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;

  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.button-wrapper.btn:hover {
  background-color: #660c33;
}

.label {
  margin-bottom: 20px;
  color: #4e5056;
  font-size: 18px;
}

.button-wrapper input[type="file"] {
  font-size: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}

.btn {
  border: none;
  padding: 10px 20px;
  border-radius: 50px;
  background-color: #8263c9;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 200ms ease-in;
}
</style>
