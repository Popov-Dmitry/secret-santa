const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", userController.create);
router.get("/:id", userController.getById);
router.post("/login", userController.login);
router.post("/token/validate", authMiddleware, userController.validateToken);
router.patch("/:id", authMiddleware, userController.update);

module.exports = router;