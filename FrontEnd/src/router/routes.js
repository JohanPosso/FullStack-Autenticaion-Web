const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/login",
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/register",
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "/listado",
        meta: { requiresAuth: true }, // Indicar que la ruta está protegida y requiere autenticación
        component: () => import("pages/ListadoPage.vue"),
      },
      {
        path: "/dashboard",
        component: () => import("pages/TableAdminPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];
export default routes;
