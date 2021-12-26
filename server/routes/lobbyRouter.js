const Router = require("express");
const router = new Router();
const lobbyController = require("../controllers/lobbyController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, lobbyController.create);
router.get("/", lobbyController.getAllPublic);
router.get("/:id", authMiddleware, lobbyController.getById);
router.get("/invite/:id", authMiddleware, lobbyController.getByInviteCode);

module.exports = router;