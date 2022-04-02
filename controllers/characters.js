const express = require("express")
const { findById } = require("../models/characters")
const router = express.Router()
const Characters = require("../models/characters")
const Users = require("../models/user")

//Index Route
router.get("/", (req, res) => {
  Characters.find({}).populate('user') 
  .exec((err,characters) => {
    if (err) {
      res.status(400).json({ err: err.message })
    }
    res.status(200).json(characters)
  })
})

//Create/Character Route
router.post("/", (req, res) => {
  Characters.create(req.body, (err, p) => {
    if (err) {
      res.status(500).json(err)
      return
    }
    Users.findById(req.body.user, (err,user) => {
      if (err) {
        res.status(400).json(err)
      }
       p.user = user
      res.status(200).json(p)
    })
  })
})

//Show Route
router.get("/:id", (req, res) => {
  Characters.findById(req.params.id, (error, characters) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }

    res.status(200).json(characters)
  })
})

//Delete Route
router.delete("/:id", async (req, res) => {
  try {
    const character = await Characters.findByIdAndDelete(req.params.id)
    
    if (character) {
      Characters.find({}).populate('user') 
      .exec((err,allCharacters)  => {
        res.status(200).json(allCharacters)
      })
    } else {
      res.status(403).json("You can only delete your characters")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//Update Route
router.put('/:id', (req,res) => {
  Characters.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, allCharacter) => {
      if(err){
          res.status(400).json({err: err.message})
      }
      Characters.find({}).populate('user') 
      .exec((err,allCharacters)  => {
          res.status(200).json(allCharacters)
      })
      
  })
})


router.get("/:id", async (req, res) => {
  try {
    const character = await Characters.findById(req.params.id)
    res.status(200).json(character)
  } catch (err) {
    res.status(500).json(err)
  }
})

//Get all of one user's characters
router.get("/user/:userId", async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId );
    console.log(req.params)
    const characters = await Characters.find({user:req.params.userId});
    res.status(200).json(characters)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
