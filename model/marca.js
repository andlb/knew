const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const marcaSchema = new Schema({
  marca: { type: String, required: [true, 'Marca não definida'] },
  key: { type: String, required: [true, 'key não definida'] },
  idfipe: {
    type: String,
    required: [true, 'idfipe não definida'],
    unique: true
  }
});
module.exports = mongoose.model('Marca', marcaSchema);
