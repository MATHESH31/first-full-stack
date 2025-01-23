import express from "express";

const userRouter = express.Router();

/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  res.json({ message: "I wish we had some information to give you ☹️" });
});

export default userRouter;
