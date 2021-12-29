const Router = require("express");
const router = new Router();
const pairController = require("../controllers/pairController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, pairController.pairUp);
router.get("/:id", authMiddleware, pairController.getByFromId);
router.get("/lobbies/:id", authMiddleware, pairController.getAllByLobbyId);

module.exports = router;