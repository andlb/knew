const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const veiculoSchema = new Schema({        
  placa: {type:String, required: [true, "Placa não definida"], unique: true, uppercase: true  },
  carro: {type:String,ref:'Anomodelo', uppercase: true},
  marca: {type:String,ref: 'Marca'},
  modelo: {type:String, ref:'Modelo'},
  anofab: {type:String},
  anomod: {type:String},
  combustivel: {type:String},
  kmmedio: {type:String},
  renavam: {type:String},
  chassi: {type:String},
  cor: {type:String},
  acessorios: [String]
});
module.exports = mongoose.model('Veiculo', veiculoSchema);