const mongoose = require('./connection')
const Characters = require('../models/characters')
const characterSeeds = require('./seeds.json')



Characters.deleteMany({})
 .then(()=>{
     return Characters.insertMany(characterSeeds)
})
 .then(data => console.log(data))
.catch(err=>console.log(err))
.finally(()=>{
    process.exit()
})