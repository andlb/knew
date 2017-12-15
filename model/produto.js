const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const produtoSchema = new Schema({
  codigoexterno: { type: String },
  descricao: { type: String, required: [true, 'Nome externo requerido'] },
  complemento: { type: String },
  NCM: { type: String },
  fabricante: {
    marca: String,
    codigo: String
  },
  altura: { type: Number },
  alturaunidade: { type: String },
  largura: { type: Number },
  larguraunidade: { type: String },
  comprimento: { type: Number },
  comprimentounidade: { type: String },
  pesobruto: { type: Number },
  pesounidade: { type: String },
  codigobarras: { type: String, unique: true, sparse: true },
  codigomontadora: [
    {
      montadora: { type: String },
      codigo: { type: String }
    }
  ],
  imagem: [String],
  linha: { type: String },
  compativel: [String],
  situacao: { type: Boolean },
  ultimaalteracao: {
    usuario: { type: String },
    datahora: { type: Date, default: Date.now() }
  },
  edicao: {
    usuario: { type: String },
    datahora: { type: Date, default: Date.now() }
  }
});

produtoSchema.index({
  descricao: 'text',
  compativel: 'text',
  'codigomontadora.codigo': 'text',
  'fabricante.codigo': 'text'
});

produtoSchema.plugin(autoIncrement.plugin, { model: 'Produto' });

module.exports = mongoose.model('Produto', produtoSchema);
