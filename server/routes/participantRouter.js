const Router = require("express");
const router = new Router();
const participantController = require("../controllers/participantController")

router.post("/", participantController.create);
router.get("/:id", participantController.getById);
router.get("/lobby/:id", participantController.getByLobbyId);

module.exports = router;