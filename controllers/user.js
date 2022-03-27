const router = require("express").Router()
const User = require("../models/user")
const bcrypt = require("bcrypt")

//GET all users to test sign up and log in
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

  return "Look at Terminal"
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
