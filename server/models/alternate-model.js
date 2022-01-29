const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Alternate = new Schema(
  {
    appId: { type: Number, required: true },
    title: { type: String, required: true },
    icon: { type: String, required: true },
    genre: { type: String, required: true },
    region: { type: String, required: false },
    foreign_id: { type: Array, required: false },
  },
  // { timestamps: true },
)

module.exports = mongoose.model('alternateios', Alternate)