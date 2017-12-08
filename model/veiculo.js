const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const veiculoSchema = new Schema({        
  placa: {type:String, required: [true, "Placa não definida"], unique: true, uppercase: true  },
  carro: {type:String, uppercase: true},
  marca: {type:String},
  modelo: {type:String},
  anofab: {type:String},
  anomod: {type:String},
  combustivel: {type:String},
  mkmedio: {type:String},
  renavam: {type:String},
  chassi: {type:String},
  cor: {type:String},
  acessorios: {type:String}    
});
module.exports = mongoose.model('Veiculo', veiculoSchema);