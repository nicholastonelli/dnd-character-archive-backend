const express = require("express")
const { findById } = require("../models/baseCharacters")
const router = express.Router()
const BaseCharacters = require("../models/baseCharacters")
const Users = require("../models/user")

//Index Route
router.get("/", (req, res) => {
  BaseCharacters.find({}).populate('user') 
  .exec((err,baseCharacters) => {
    if (err) {
      res.status(400).json({ err: err.message })
    }
    res.status(200).json(baseCharacters)
  })
})

//Create/Character Route
router.post("/", (req, res) => {
  BaseCharacters.create(req.body, (err, p) => {
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
  BaseCharacters.findById(req.params.id, (error, baseCharacters) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }

    res.status(200).json(baseCharacters)
  })
})

//Delete Route
router.delete("/:id", async (req, res) => {
  try {
    const character = await BaseCharacters.findByIdAndDelete(req.params.id)
    
    if (character) {
      BaseCharacters.find({}).populate('user') 
      .exec((err,allBaseCharacters)  => {
        res.status(200).json(allBaseCharacters)
      })
    } else {
      res.status(403).json("You can only delete your baseCharacters")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//Update Route
router.put('/:id', (req,res) => {
  BaseCharacters.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, allCharacter) => {
      if(err){
          res.status(400).json({err: err.message})
      }
      BaseCharacters.find({}).populate('user') 
      .exec((err,allBaseCharacters)  => {
          res.status(200).json(allBaseCharacters)
      })
      
  })
})

// like/dislike a character
router.put("/:id/like", async (req, res) => {
  try {
    const character = await BaseCharacters.findById(req.params.id)
    console.log(character)
    if (character.userId !== req.body.userId) {
      // let savedCharacter = await character.updateOne({ $push: { likes: req.body.userId }},{new: true},(err, doc)=> {
      //
      // })
      character.likes[0] += 1
      //number of likes vs. array of user id's
      // character.likes.push(req.body.userId)
      let update = await character.save()
      res.status(200).json(update)
    } else {
      res.status(200).json("You cannot like your own character")
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const character = await BaseCharacters.findById(req.params.id)
    res.status(200).json(character)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
