const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/", userController.create);
router.get("/:id", userController.getById);
router.post("/login", userController.login);

module.exports = router;