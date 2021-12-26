const Router = require("express");
const router = new Router();
const lobbyController = require("../controllers/lobbyController");

router.post("/", lobbyController.create);
router.get("/", lobbyController.getAllPublic);
router.get("/:id", lobbyController.getById);
router.get("/invite/:id", lobbyController.getByInviteCode);

module.exports = router;