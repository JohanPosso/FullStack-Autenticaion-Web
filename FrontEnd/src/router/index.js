import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { LocalStorage } from "quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((route) => route.meta.requiresAuth);
    const userRole = LocalStorage.getItem("role");

    const roleRequiresAuth = to.meta.roles.find((e) => e === userRole);

    if (requiresAuth && !userRole) {
      // Si la ruta requiere autenticación y no hay un rol de usuario almacenado, redirige a la página de inicio de sesión
      next("/login");
    } else {
      // Si la ruta requiere autenticación y hay un rol de usuario almacenado, verifica el rol
      if (requiresAuth && roleRequiresAuth !== userRole) {
        next("/");
        // Si el rol de usuario no coincide con el requerido para la ruta, redirige a una página de acceso no autorizado
      } else {
        // De lo contrario, permite la navegación

        next();
      }
    }
  });

  return Router;
});
