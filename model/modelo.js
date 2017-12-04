const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const modeloSchema = new Schema({
  modelo: { type: String, required: [true, 'Modelo não definida'] },
  key: { type: String, required: [true, 'key não definida'] },
  idfipe: {
    type: String,
    required: [true, 'idfipe não definida'],
    unique: true
  },
  idmarca: {
    type: String,
    required: [true, 'idmarca não definida'],    
  }
});
module.exports = mongoose.model('Modelo', modeloSchema);
