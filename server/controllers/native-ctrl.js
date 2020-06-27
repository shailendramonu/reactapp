const Native = require('../models/native-model')
const store = require('app-store-scraper');

createNative = (req, res) => {
  const body = req.body

  console.log("Adding: " + body);
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a native',
    })
  }

  const native = new Native(body)

  if (!native) {
    return res.status(400).json({ success: false, error: err })
  }

  native
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: native._id,
        message: 'Native created!',
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Native not created!',
      })
    })
}

updateNative = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    })
  }

  Native.findOne({ _id: req.params.id }, (err, native) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Native not found!',
      })
    }
    native.appId = body.appId
    native.title = body.title
    native.icon = body.icon
    native.genres = body.genres
    native.region = body.region
    native
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: native._id,
          message: 'Native updated!',
        })
      })
      .catch(error => {
        return res.status(404).json({
          error,
          message: 'Native not updated!',
        })
      })
  })
}

deleteNative = async (req, res) => {
  await Native.findOneAndDelete({ _id: req.params.id }, (err, native) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    if (!native) {
      return res
        .status(404)
        .json({ success: false, error: `Native not found` })
    }

    return res.status(200).json({ success: true, data: native })
  }).catch(err => console.log(err))
}

getNativeById = async (req, res) => {
  await Native.findOne({ _id: req.params.id }, (err, native) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }

    return res.status(200).json({ success: true, data: native })
  }).catch(err => console.log(err))
}

getNatives = async (req, res) => {
  await Native.find({}, (err, natives) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!natives.length) {
      return res
        .status(404)
        .json({ success: false, error: `Native not found` })
    }
    return res.status(200).json({ success: true, data: natives })
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
  createNative,
  updateNative,
  deleteNative,
  getNatives,
  getNativeById,
  getSearch
}