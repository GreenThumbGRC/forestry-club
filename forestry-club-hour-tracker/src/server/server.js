import express from 'express'
import workhoursRouter from "./router/workhoursRouter.js";
import usersRouter from "./router/usersRouter.js";

const app = express()

app.use(express.json())
app.use('/api/hours', workhoursRouter)
app.use('/api/users', usersRouter)

app.listen(3002, () => console.log("Listening on port 3002"))