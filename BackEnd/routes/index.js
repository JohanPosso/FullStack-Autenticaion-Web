const tokenMiddleware = require("../middleware/user.middleware");
const loginController = require("../controllers/login.controller");
const userController = require("../controllers/user.controller");
const roleMiddleware = require("../middleware/role.middleware");
const uploadProfilePicture = require("../controllers/upload.controller");
const uploadFileMiddleware = require("../middleware/uploadFile.middleware");
const allPhotoUser = require("../controllers/photoUser.controller");

function allRoutes(app) {
  const router = require("express").Router();
  router.post("/token", loginController.loginUser);
  router.post("/logout", loginController.logoutUser);
  router.post(
    "/crear",
    // tokenMiddleware,
    // roleMiddleware,
    userController.createUser
  );
  router.get("/todo", userController.saludo);
  router.delete("/delete/:id", userController.deleteUser);
  router.put("/edit/:id", userController.editUser);
  router.post(
    "/upload",
    tokenMiddleware,
    uploadFileMiddleware.single("profile"),
    uploadProfilePicture.uploadProfile
  );
  router.post(
    "/uploadphotofeed", //Cargar fotos para el feed
    tokenMiddleware,
    uploadFileMiddleware.single("profile"),
    uploadProfilePicture.uploadPhotoFeed
  );
  router.post(
    "/dowloadprofile",
    tokenMiddleware,
    uploadProfilePicture.downloadProfile
  );
  router.get("/allphoto", tokenMiddleware, allPhotoUser);

  app.use(router);
}

module.exports = allRoutes;
