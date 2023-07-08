const tokenMiddleware = require("../middleware/user.middleware"); //Middleware
const loginController = require("../controllers/login.controller"); // Controllers
const userController = require("../controllers/user.controller"); // Controllers
const roleMiddleware = require("../middleware/role.middleware");

function allRoutes(app) {
  const router = require("express").Router();
  router.post("/token", loginController);
  router.post(
    "/crear",
    // tokenMiddleware,
    // roleMiddleware,
    userController.createUser
  );
  router.get("/todo", userController.saludo);
  router.post("/delete/:id", userController.deleteUser);
  router.post("/edit/:id", userController.editUser);
  app.use(router);
}

module.exports = allRoutes;
