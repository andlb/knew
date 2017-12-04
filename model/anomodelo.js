const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const anomodeloSchema = new Schema({
  descricaocompleta: {
    type: String,
    required: [true, 'Descricao não definida']
  },
  ano: { type: String, required: [true, 'Ano não definida'] },
  idmodelo: { type: String, required: [true, 'key modelo não definida'] },
  idmarca: { type: String, required: [true, 'key marca não definida'] },
  idfipe: { type: String, required: [true, 'key não definida'] }
});

anomodeloSchema.index(
  { idfipe: 1, idmarca: 1, idmodelo: 1 },
  { unique: true }
);
anomodeloSchema.index({ descricaocompleta: 'text' });

module.exports = mongoose.model('Anomodelo', anomodeloSchema);
