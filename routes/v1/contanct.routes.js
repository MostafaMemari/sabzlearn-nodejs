const express = require("express");
const contactController = require("./../../controllers/v1/contactController");
const isAdminMiddleware = require("../../middlewares/isAdminMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");

const contanctRouter = express.Router();

contanctRouter.route("/").get(authMiddleware, isAdminMiddleware, contactController.getAll).post(contactController.create);

contanctRouter.route("/:id").delete(contactController.remove);
contanctRouter.route("/answer").post(contactController.answer);

module.exports = contanctRouter;
