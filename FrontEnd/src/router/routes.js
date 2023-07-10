const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: { requiresAuth: false, roles: ["admin", "user"] },
    children: [
      {
        path: "/login",
        name: "login",
        meta: { requiresAuth: false, roles: ["admin", "user"] },
        component: () => import("pages/LoginPage.vue"),
      },
      {
        path: "/register",
        meta: { requiresAuth: false },
        component: () => import("pages/RegisterPage.vue"),
      },
      {
        path: "/listado",
        name: "listado",
        meta: { requiresAuth: true, roles: ["admin", "user"] }, // Indicar que la ruta está protegida y requiere autenticación
        component: () => import("pages/ListadoPage.vue"),
      },
      {
        path: "/dashboard",
        component: () => import("pages/TableAdminPage.vue"),
        meta: { requiresAuth: true, roles: ["admin"] },
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];
export default routes;
