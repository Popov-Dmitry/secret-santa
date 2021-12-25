const Router = require("express");
const router = new Router();
const lobbyController = require("../controllers/lobbyController");

router.post("/", lobbyController.create);
router.get("/", lobbyController.getAllPublic);
router.get("/:id", lobbyController.getById);

module.exports = router;