const express = require("express");
const categorieController = require("../../controllers/v1/categorieController");
const authMiddleware = require("../../middlewares/authMiddleware");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");

const categorieRouter = express.Router();

categorieRouter.route("/").post(authMiddleware, isAdminMiddleware, categorieController.create).get(categorieController.getAll);
categorieRouter
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, categorieController.remove)
  .put(authMiddleware, isAdminMiddleware, categorieController.update);

module.exports = categorieRouter;
