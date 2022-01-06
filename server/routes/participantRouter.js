const Router = require("express");
const router = new Router();
const participantController = require("../controllers/participantController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, participantController.create);
router.get("/:id", authMiddleware, participantController.getById);
router.get("/lobby/:id", participantController.getByLobbyId);
router.get("/count/total", participantController.count);

module.exports = router;