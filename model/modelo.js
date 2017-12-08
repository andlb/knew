const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const modeloSchema = new Schema({
  _id:{type:String},
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
modeloSchema.index({idfipe:1,idmarca:1});
module.exports = mongoose.model('Modelo', modeloSchema);
