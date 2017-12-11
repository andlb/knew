const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const produtoSchema = new Schema({
  codigoexterno: {type:String, required: [true, "Código externo requerido"], unique: true  },
  nome:{type:String, required: [true, "Nome externo requerido"] },
  descricao:{type:String},
  NCM:{type:String},
  fabricante:
    {marca:String,
    codigo:String},
  altura:{type:Number},
  alturaunidade:{type:String},
  largura:{type:Number},
  larguraunidade:{type:String},
  comprimento:{type:Number},
  comprimentounidade:{type:String},
  pesobruto:{type:Number},
  pesounidade:{type:String},
  codigobarras:{type:String, unique:true, sparse:true},
  codigomontadora:[{    
      montadora:{type:String},
      codigo:{type:String},          
  }],
  imagem: [String],
  linha:{type:String},
  compativel:[String],
  situacao:{type:Boolean}
});

produtoSchema.index({ nome: 'text',
compativel:'text',
'codigomontadora.codigo':'text',
'fabricante.codigo':'text' });

produtoSchema.plugin(autoIncrement.plugin,  { model: 'Produto'});

module.exports = mongoose.model('Produto', produtoSchema);