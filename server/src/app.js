import express from "express";
import cors from "cors";
import userRouter from "./routes/userRouter.js";
import doctorRouter from "./routes/doctorRouter.js";
import adminRouter from "./routes/adminRouter.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctor", doctorRouter);
// app.use("/api/v1/admins", adminRouter);
// app.use("/api/v1/notification", doctorRouter);

app.get("/", (req, res) => {
  res.send("hello world!");
});




export { app };
