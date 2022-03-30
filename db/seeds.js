const mongoose = require('./connection')
const Characters = require('../models/characters')
const BaseCharacters = require('../models/baseCharacters')
const characterSeeds = require('./seeds.json')



Characters.deleteMany({})
 .then(()=>{
     return Characters.insertMany(characterSeeds)
})
 .then(data => console.log(data))
.catch(err=>console.log(err))

BaseCharacters.deleteMany({})
 .then(()=>{
     return BaseCharacters.insertMany(characterSeeds)
})
 .then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})