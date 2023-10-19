const express = require("express");
const newsletterController = require("../../controllers/v1/newsletter.Controller");
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdminMiddleware = require("./../../middlewares/isAdminMiddleware");

const router = express.Router();

router.route("/").get(authMiddleware, isAdminMiddleware, newsletterController.getAll).post(newsletterController.create);

module.exports = router;
