const express = require("express");
const userController = require("../../controllers/v1/user.Controller");
const authMiddleware = require("../../middlewares/authMiddleware");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");

const usersRouter = express.Router();

usersRouter
  .route("/")
  .get(authMiddleware, isAdminMiddleware, userController.getAll)
  .put(authMiddleware, userController.updateUser);
usersRouter.route("/:id").delete(authMiddleware, isAdminMiddleware, userController.removeUser);
usersRouter.route("/role").put(authMiddleware, isAdminMiddleware, userController.changeRole); //id => req.body
usersRouter.route("/ban/:id").post(authMiddleware, isAdminMiddleware, userController.banUser);

module.exports = usersRouter;
