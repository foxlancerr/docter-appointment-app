import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import doctorRouter from "./routes/doctorRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("hello world!");
});

export { app };
