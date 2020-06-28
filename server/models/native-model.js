const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Native = new Schema (
  {
    appId: { type: Number, required: true },
    title: { type: String, required: true },
    icon: { type: String, required: true },
    genres: { type: String, required: true },
    region: { type: String, required: false },
    alters: {type: Array, default : [11,22] }
  },
)

module.exports = mongoose.model('nativeios', Native)