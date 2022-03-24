const mongoose = require("../db/connection")

const characterSchema = new mongoose.Schema(
  {
    // Page 1
    name: { type: String, required: true },
    class: { type: String, required: true },
    subclass: { type: String, required: true },
    level: { type: Number, required: true, default: 1 },
    background: { type: String, required: true },
    race: { type: String, required: true, default: "human" },
    alignment: { type: String, required: true, default: "true neutral" },
    experiencePoints: { type: Number, default: 0 },
    statistics: {
      str: { type: Number, required: true },
      dex: { type: Number, required: true },
      con: { type: Number, required: true },
      int: { type: Number, required: true },
      wis: { type: Number, required: true },
      cha: { type: Number, required: true },
    },
    inspiration: { type: Boolean, default: false },
    savingThrows: {
      str: { type: Boolean, required: true, default: false },
      dex: { type: Boolean, required: true, default: false },
      con: { type: Boolean, required: true, default: false },
      int: { type: Boolean, required: true, default: false },
      wis: { type: Boolean, required: true, default: false },
      cha: { type: Boolean, required: true, default: false },
    },
    skills: {
      acrobatics: {
        proficincy: { type: Boolean, required: true, default: false },
        expertise: { type: Boolean, required: true, default: false },
        misc: { type: Number, required: true, default: 0 },
      },
      animalHandling: {
        proficincy: { type: Boolean, required: true, default: false },
        expertise: { type: Boolean, required: true, default: false },
        misc: { type: Number, required: true, default: 0 },
      },
      arcana: {
        proficincy: { type: Boolean, required: true, default: false },
        expertise: { type: Boolean, required: true, default: false },
        misc: { type: Number, required: true, default: 0 },
      },
      survival: {
        proficincy: { type: Boolean, required: true, default: false },
        expertise: { type: Boolean, required: true, default: false },
        misc: { type: Number, required: true, default: 0 },
      },
    },
    armorClass: {
      baseArmor: { type: Number, required: true, default: 10 },
      shieldBonus: { type: Number, required: true, default: 0 },
      miscBonus: { type: Number, required: true, default: 0 },
    },
    speed: { type: Number, required: true, default: 30 },
    hitDice: {
      die: { type: Number, required: true, default: 0 },
      current: { type: Number, required: true, default: 0 },
    },
    hitPoints: {
      max: { type: Number, required: true, default: 0 },
      current: { type: Number, required: true, default: 0 },
      temp: { type: Number, required: true, default: 0 },
    },
    deathSaves: {
      successes: { type: Number, required: true, default: 0 },
      failures: { type: Number, required: true, default: 0 },
    },
    attacks: {},

    equipment: {
      currency: {
        platinum: { type: Number, required: true, default: 0 },
        gold: { type: Number, required: true, default: 0 },
        electrum: { type: Number, required: true, default: 0 },
        silver: { type: Number, required: true, default: 0 },
        copper: { type: Number, required: true, default: 0 },
      },
    },
    personality:{
      traits: { type: String, required: true, default: " " },
      ideals: { type: String, required: true, default: " " },
      bonds: { type: String, required: true, default: " " },
      flaws: { type: String, required: true, default: " " }
    },
    featuresAndTraits:{

    },

    // Page 2
    characteristics: {
      age: { type: Number, required: true, default: 0 },
      height: { type: String, required: true, default: 0 },
      weight: { type: Number, required: true, default: 0 },
      eyes: { type: String, required: true, default: " " },
      skin: { type: String, required: true, default: " " },
      hair: { type: String, required: true, default: " " },
    },
    characterAppearance: { type: String, required: true, default: " " },
    characterBackstory: { type: String, required: true, default: " " },
    alliesAndOrgs: { type: String, required: true, default: " " },
    treasure: { type: String, required: true, default: " " },
    symbol: {type: String},
    // Page 3
    spellcasting: {
      levelZero: {
        slotsTotal:{ type: Number, required: true, default: 0 },
        slotsExpended:{ type: Number, required: true, default: 0 },
        spellsKnown: {type: Array, required: true, default: []}
      },
      levelOne: {
        slotsTotal:{ type: Number, required: true, default: 0 },
        slotsExpended:{ type: Number, required: true, default: 0 },
        spellsKnown: {type: Array, required: true, default: []}
      },
      levelTwo: {
        slotsTotal:{ type: Number, required: true, default: 0 },
        slotsExpended:{ type: Number, required: true, default: 0 },
        spellsKnown: {type: Array, required: true, default: []}
      },
      levelThree: {
        slotsTotal:{ type: Number, required: true, default: 0 },
        slotsExpended:{ type: Number, required: true, default: 0 },
        spellsKnown: {type: Array, required: true, default: []}
      },
      levelFour: {
        slotsTotal:{ type: Number, required: true, default: 0 },
        slotsExpended:{ type: Number, required: true, default: 0 },
        spellsKnown: {type: Array, required: true, default: []}
      },
      levelFive: {
        slotsTotal:{ type: Number, required: true, default: 0 },
        slotsExpended:{ type: Number, required: true, default: 0 },
        spellsKnown: {type: Array, required: true, default: []}
      },
      levelSix: {
        slotsTotal:{ type: Number, required: true, default: 0 },
        slotsExpended:{ type: Number, required: true, default: 0 },
        spellsKnown: {type: Array, required: true, default: []}
      },
      levelSeven: {
        slotsTotal:{ type: Number, required: true, default: 0 },
        slotsExpended:{ type: Number, required: true, default: 0 },
        spellsKnown: {type: Array, required: true, default: []}
      },
      levelEight: {
        slotsTotal:{ type: Number, required: true, default: 0 },
        slotsExpended:{ type: Number, required: true, default: 0 },
        spellsKnown: {type: Array, required: true, default: []}
      },
      levelNine: {
        slotsTotal:{ type: Number, required: true, default: 0 },
        slotsExpended:{ type: Number, required: true, default: 0 },
        spellsKnown: {type: Array, required: true, default: []}
      }
    },
    // Additional Details

    relativePower: {type: Number, default: 0},
    //userId: {      type: String,
    //required: true,
    //},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
)

const Character = mongoose.model("Character", characterSchema)

module.exports = Character
