const Alternate = require('../models/alternate-model')
const store = require('app-store-scraper');

createAlternate = (req, res) => {
  const body = req.body
  body.foreign_id = body.relations

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a alternate',
    })
  }

  const alternate = new Alternate(body)

  if (!alternate) {
    return res.status(400).json({ success: false, error: err })
  }

  alternate
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: alternate._id,
        message: 'Alternate created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Alternate not created!',
      })
    })
}

updateAlternate = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Alternate.findOne({ _id: req.params.id }, (err, alternate) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Alternate not found!',
      })
    }
    alternate.appId = body.appId
    alternate.title = body.title
    alternate.icon = body.icon
    alternate.genres = body.genres
    alternate.region = body.region
    alternate
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: alternate._id,
          message: 'Alternate updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Alternate not updated!',
        })
      })
  })
}

deleteAlternate = async (req, res) => {
  await Alternate.findOneAndDelete({ _id: req.params.id }, (err, alternate) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!alternate) {
      return res
        .status(404)
        .json({ success: false, error: `Alternate not found` })
    }

    return res.status(200).json({ success: true, data: alternate })
  }).catch(err => console.log(err))
}

getAlternateById = async (req, res) => {
  await Alternate.findOne({ _id: req.params.id }, (err, alternate) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    return res.status(200).json({ success: true, data: alternate })
  }).catch(err => console.log(err))
}

getAlternateByTitle = async (req, res) => {
  await Alternate.find({ title: { $regex: req.params.title, $options: 'i'} }, (err, native) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    return res.status(200).json({ success: true, data: native })
  }).catch(err => console.log(err))
}

getAlternates = async (req, res) => {
  await Alternate.find({}, (err, alternates) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!alternates.length) {
      return res
        .status(404)
        .json({ success: false, error: `Alternate not found` })
    }
    return res.status(200).json({ success: true, data: alternates })
  }).catch(err => console.log(err))
}

getSearch = async (req, res) => {
  console.log(req.query);
  const results = await store.search({
    term: req.query.term,
    num: 5,
    //idsOnly: true
  })
  return res.status(200).json({ success: true, data: results})
}

module.exports = {
  createAlternate,
  updateAlternate,
  deleteAlternate,
  getAlternates,
  getAlternateById,
  getAlternateByTitle,
  getSearch
}