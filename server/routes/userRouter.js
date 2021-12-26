const Router = require("express");
const router = new Router();
const userController = require("../controllers/userController");

router.post("/", userController.create);
router.get("/:id", userController.getById);

module.exports = router;