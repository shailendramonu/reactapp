const express = require('express')

const AlternateCtrl = require('../controllers/alternate-ctrl')

const router = express.Router()

router.post('/alternate', AlternateCtrl.createAlternate)
router.put('/alternate/:id', AlternateCtrl.updateAlternate)
router.delete('/alternate/:id', AlternateCtrl.deleteAlternate)
router.get('/alternate/:id', AlternateCtrl.getAlternateById)
router.get('/alternates', AlternateCtrl.getAlternates)
router.get('/search', AlternateCtrl.getSearch)

module.exports = router