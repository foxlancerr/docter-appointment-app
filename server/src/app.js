import express from "express"
import cors from "cors"
import userRouter from "./routes/userRouter.js"

const app = express()

app.use(cors())
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))

//routes declaration
app.use("/api/v1/users", userRouter)


app.get("/", (req, res) => {
    res.send("hello world!");
})

export { app }
