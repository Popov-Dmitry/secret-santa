const Router = require("express");
const router = new Router();
const lobbyRouter = require("./lobbyRouter");
const userRouter = require("./userRouter");
const participantRouter = require("./participantRouter");

router.use("/lobbies", lobbyRouter);
router.use("/users", userRouter);
router.use("/participants", participantRouter);

module.exports = router;