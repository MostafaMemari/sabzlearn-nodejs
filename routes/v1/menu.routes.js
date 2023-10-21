const express = require("express");
const menusController = require("./../../controllers/v1/menuController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdminMiddleware = require("./../../middlewares/isAdminMiddleware");

const router = express.Router();

router.route("/").get(menusController.getAll).post(authMiddleware, isAdminMiddleware, menusController.create);

router.route("/all").get(authMiddleware, isAdminMiddleware, menusController.getAllInPanel);

router.route("/:id").delete(authMiddleware, isAdminMiddleware, menusController.remove);

module.exports = router;
