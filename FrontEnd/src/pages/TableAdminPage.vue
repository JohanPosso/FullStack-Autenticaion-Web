<template>
  <NavbarMenu>
    <div class="row q-pa-lg justify-center">
      <SidebarMenuAkahon></SidebarMenuAkahon>
      <q-table
        title="Admin Dashboard"
        :rows="prueba()"
        :columns="columns"
        row-key="id"
        :selected-rows-label="getSelectedString"
        selection="multiple"
        v-model="selected"
      >
        <template v-slot:body-cell-actions="">
          <div class="q-gutter-xs text-center">
            <i style="font-size: 20px" class="material-icons">edit</i>
            <i style="font-size: 20px" class="material-icons">delete</i>
          </div>
        </template>
      </q-table>
    </div>
  </NavbarMenu>
</template>

<script>
const columns = [
  {
    name: "id",
    label: "id",
    align: "left",
    field: "id",
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    sortable: true,
  },
  {
    name: "type_identification",
    align: "left",
    field: "type_identification",
    label: "TI",
  },
  {
    name: "identification",
    align: "left",
    field: "identification",
    label: "Identification",
  },
  {
    name: "name",
    align: "left",
    field: "name",
    label: "Name",
  },
  {
    name: "lastname",
    align: "left",
    field: "lastname",
    label: "Lastname",
  },

  {
    name: "email",
    label: "Email",
    field: "email",
    align: "left",

    sortable: true,
  },
  {
    name: "role",
    label: "Role",
    field: "role",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "phone",
    label: "Phone",
    field: "phone",
  },
  {
    name: "ocupation",
    label: "Ocupation",
    field: "ocupation",
  },
  {
    label: "createdAt",
    name: "createdAt",
    field: "createdAt",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

import { api } from "src/boot/axios";
import NavbarMenu from "../components/NavbarComponent.vue";
import SidebarMenuAkahon from "src/components/Sidebar-menu-akahon.vue";
import { ref } from "vue";
export default {
  components: { NavbarMenu, SidebarMenuAkahon },
  data() {
    const selected = ref([]);
    return {
      selected,
      columns,
      datosApi: [],
    };
  },

  async created() {
    const allUser = await api.get("/todo");
    // const deleteUser = await api.delete(`/delete/${}`);
    this.datosApi = allUser.data;
  },
  methods: {
    prueba() {
      const datos = this.datosApi.map((e) => {
        return {
          id: e.id,
          type_identification: e.type_identification,
          identification: e.identification,
          name: e.name,
          lastname: e.lastname,
          role: e.role,
          email: e.email,
          phone: e.phone,
          ocupation: e.ocupation,
          createdAt: e.createdAt,
        };
      });
      return datos;
    },
    identifier() {
      const id = this.prueba().map((e) => e.id);
      return id;
    },
    getSelectedString() {
      return this.selected.value.length === 0
        ? ""
        : `${this.selected.value.length} record${
            this.selected.value.length > 1 ? "s" : ""
          } selected of ${rows.length}`;
    },
  },
};
</script>
