<template>
  <NavbarMenu>
    <div class="row q-pa-lg justify-center">
      <SidebarMenuAkahon></SidebarMenuAkahon>
      <q-table
        title="Admin Dashboard"
        :rows="prueba()"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body-cell-actions="">
          <div class="q-gutter-xs text-center">
            <q-btn color="primary" label="Edit" />
            <q-btn color="red" label="Delete" />
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
    name: "name",
    align: "left",
    field: "name",
    label: "name",
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
    label: "createdAt",
    name: "createdAt",
    field: "createdAt",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },

  {
    label: "Actions",
    name: "actions",
    align: "center",
    sortable: false,
    component: "custom-actions", // Nombre del componente personalizado para las acciones
  },
];

import { api } from "src/boot/axios";
import NavbarMenu from "../components/NavbarComponent.vue";
import SidebarMenuAkahon from "src/components/Sidebar-menu-akahon.vue";
export default {
  components: { NavbarMenu, SidebarMenuAkahon },
  data() {
    return {
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
          name: e.name,
          role: e.role,
          email: e.email,
          createdAt: e.createdAt,
        };
      });
      return datos;
    },
    identifier() {
      const id = this.prueba().map((e) => e.id);
      return id;
    },
  },
};
</script>
