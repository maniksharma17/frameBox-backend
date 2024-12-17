const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()

const templateRouter = require("./routes/template")
const chatRouter = require("./routes/chat")

const app = express()
app.use(express.json())
app.use(cors())

app.use('/template', templateRouter)
app.use('/chat', chatRouter)

app.listen(3000, ()=>{
  console.log("Listening on 3000.")
})