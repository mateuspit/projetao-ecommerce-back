import express from "express"
import cors from "cors"
import router from "./routes/index.routes.js"
import apiPort from "./constants/apiPort.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(router)

app.listen(apiPort, () => console.log(`API runing at port ${apiPort}`))