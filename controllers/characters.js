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

// router.put("/:id", async (req, res) => {
//   try {
//     const character = await Characters.findById(req.params.id)
//     /* if (character.userId === req.body.userId) { */
//       await character.updateOne({ $set: req.body })
//       res.status(200).json("Character Updated")
//     /* } else {
//       res.status(403).json("You can only update your characters")
//     } */
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

// like/dislike a character
router.put("/:id/like", async (req, res) => {
  try {
    const character = await Characters.findById(req.params.id)
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
    const character = await Characters.findById(req.params.id)
    res.status(200).json(character)
  } catch (err) {
    res.status(500).json(err)
  }
})

//get timeline character

router.get("/timeline/:userId", async (req, res) => {
  let characterArray = [];

  try {
    const currentUser = await Users.findById(req.body.userId)
    const userCharacters = await Characters.find({ userId: currentUser._id })
    const friendCharacters = await Promise.all(
      currentUser.followings.map((friendId) => {
        Characters.find({ userId: friendId })
      })
    )
    res.json(userCharacters.concat(...friendCharacters))
  } catch (err) {
    res.status(500).json(err)
  }
})

//Get all user characters
router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id );
    const characters = await Characters.find({user:req.params.id});
    res.status(200).json(characters);
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
