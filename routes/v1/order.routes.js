const express = require("express");
const ordersController = require("../../controllers/v1/order.Controller");
const authMiddleware = require("../../middlewares/authMiddleware");

const router = express.Router();

router.route("/").get(authMiddleware, ordersController.getAll);
router.route("/:id").get(authMiddleware, ordersController.getOne);

module.exports = router;
