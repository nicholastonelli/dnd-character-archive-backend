const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

//GET
router.get("/", (req, res) => {
  User.find({}, (err, posts) => {
    if (err) {
      res.status(400).json({ err: err.message })
    }
    res.status(200).json(posts)
  })
})

// Register
router.post("/register", async (req, res) => {
  console.log("Registering")
  try {
    if (req.body.password === req.body.verifyPassword) {
      const userExists = await User.findOne({ username: req.body.username })
      const emailTaken = await User.findOne({ email: req.body.email })
      if (userExists || emailTaken) {
        res.send("User Already Exists or Email is Taken")
      } else {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const newUser = await new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          verifyPassword: hashedPassword,
        })
        const user = await newUser.save()
        res.status(200).json(user)
      }
    } else {
      res.send("Password must match")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    !user && res.status(404).json("user not found")
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})


//GET A USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

//EDIT USER INFO
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateUser) => {
      if (err) {
        res.status(400).json(err)
      }
      res.status(200).json(updateUser)
    }
  )
})

module.exports = router
