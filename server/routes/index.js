const Router = require("express");
const router = new Router();
const lobbyRouter = require("./lobbyRouter");
const userRouter = require("./userRouter");

router.use("/lobbies", lobbyRouter);
router.use("/users", userRouter);

module.exports = router;