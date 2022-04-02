const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const methodOverride = require("method-override")
const cors = require("cors")
const session = require("express-session")

const characterController = require("./controllers/characters")
const baseCharacterController = require("./controllers/baseCharacters")
const authController = require("./controllers/auth")
const userController = require("./controllers/user")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
)
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)


app.use("/characters", characterController)
app.use("/baseCharacters", baseCharacterController)
app.use("/users", userController)
app.use("/auth", authController)

app.set("port", process.env.PORT || 2000)

app.listen(app.get("port"), () =>
  console.log(`We're listening on port ${app.get("port")}`)
)
