const express = require("express");
const offController = require("./../../controllers/v1/OffController");
const authMiddleware = require("./../../middlewares/authMiddleware");
const isAdminMiddleware = require("./../../middlewares/isAdminMiddleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, offController.getAll)
  .post(authMiddleware, isAdminMiddleware, offController.create);

router.route("/all").post(authMiddleware, isAdminMiddleware, offController.setOnAll);

router.route("/:code").post(authMiddleware, offController.getOne);

router.route("/:id").delete(authMiddleware, offController.remove);

module.exports = router;
