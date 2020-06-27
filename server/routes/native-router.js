const express = require('express')

const NativeCtrl = require('../controllers/native-ctrl')

const router = express.Router()

router.post('/native', NativeCtrl.createNative)
router.put('/native/:id', NativeCtrl.updateNative)
router.delete('/native/:id', NativeCtrl.deleteNative)
router.get('/native/:id', NativeCtrl.getNativeById)
router.get('/natives', NativeCtrl.getNatives)
router.get('/search', NativeCtrl.getSearch)

module.exports = router