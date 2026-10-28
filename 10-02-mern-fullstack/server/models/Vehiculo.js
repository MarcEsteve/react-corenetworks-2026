const mongoose = require('mongoose')

const vehiculoSchema = new mongoose.Schema({
  matricula: { type: String, required: true, trim: true, uppercase: true },
  marca: { type: String, required: true, trim: true },
  modelo: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  seguroEnVigor: { type: Boolean, required: true },
  fechaUltimaITV: { type: String, required: true },
}, { collection: 'vehiculos', versionKey: false, autoIndex: false })

module.exports = mongoose.model('Vehiculo', vehiculoSchema)
