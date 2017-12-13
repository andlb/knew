const mongoose = require('mongoose');
const config = require('../config/database')['development'];
const Produto = require('./../model/produto');
const autoIncrement = require('mongoose-auto-increment');

var LineByLineReader = require('line-by-line'),
lr = new LineByLineReader('dadosPeca.txt');
error = 0;


mongoose.connect(config.uri, err => {
  if (err) {
    console.log('could not connect to database', err);
    return;
  } else {
    autoIncrement.initialize(mongoose.connection);
    lr.on('error', function (err) {
      console.log('houve erro');
    });
    
    lr.on('line', function (line) {
      cadastraProduto(line);      
    });
    
    lr.on('end', function () {
      // All lines are read, file is closed now.
      console.log('fim do arquivo');
    });    
  }
});

function retiraaspa(line){
  lLines = line.split('"');
  if (lLines.length > 0) {
    for (let cLine=0;cLine<lLines.length;cLine++){
      if (cLine % 2){
        lLines[cLine] = lLines[cLine].replace(new RegExp("'",'g'),' ');        
      }
    }
  }
  return lLines.join('"')
}

function cadastraProduto(line) {    
  line = line.replace(new RegExp(", [...]",'g'),'');
  line = retiraaspa(line); 
  line = line.replace(new RegExp("'",'g'),'"');
  try{
    linejs = JSON.parse(line);
  }catch (ex) {
    error = error+1
    console.log(error);
    return;
  }  
  dadosCarro = {};  
  for (var c = 0; c < linejs.length; c++) {    
    if (linejs[c].codigopecasite){
      dadosCarro.codigoexterno = linejs[c].codigopecasite;
      if (dadosCarro.codigoexterno == '1805904') {
        console.log('entrou al');
      }
      continue;
    }

    if (linejs[c].titulo){
      dadosCarro.descricao = linejs[c].titulo;
      continue;
    }    

    if (linejs[c].descricao){
      dadosCarro.complemento = linejs[c].descricao;
      continue;
    }    

    if (linejs[c].NCM){
      dadosCarro.NCM = linejs[c].NCM;
      continue;
    }  
    if (linejs[c].Altura){
      altura = linejs[c].Altura.split(' ');
      dadosCarro.altura = altura[0];
      dadosCarro.alturaunidade = altura[1];
      continue;
    }      

    if (linejs[c].Largura){
      largura = linejs[c].Largura.split(' ');
      dadosCarro.largura = largura[0];
      dadosCarro.larguraunidade = largura[1];
      continue;
    }

    if (linejs[c].Comprimento){
      comprimento = linejs[c].Comprimento.split(' ');
      dadosCarro.comprimento = comprimento[0];
      dadosCarro.comprimentounidade = comprimento[1];
      continue;
    }

    if (linejs[c].PesoBruto){
      pesobruto = linejs[c].PesoBruto.split(' ');
      dadosCarro.pesobruto = pesobruto[0];
      dadosCarro.pesounidade = pesobruto[1];
      continue;
    }

    if (linejs[c]["Códigodebarras"]){
      dadosCarro.codigobarras = linejs[c]["Códigodebarras"];
      continue;
    }    
    if (linejs[c].linha){
      dadosCarro.linha = linejs[c].linha;
      continue;
    }
    if (linejs[c].image){      
      dadosCarro.imagem = [];
      for (let cImag = 0;cImag < linejs[c].image.length;cImag++ ){
        dadosCarro.imagem.push(linejs[c].image[cImag]);
      }
      continue;
    }
    if (linejs[c].Marca){
      if (linejs[c+1]["CódigodaPeça"] ) {
        fabricante = {"marca" : linejs[c].Marca , "codigo":linejs[c+1]["CódigodaPeça"]};
        dadosCarro.fabricante = fabricante;
      }
    }    
    if (linejs[c].compativel){      
      dadosCarro.compativel = [];
      for (let cComp = 0;cComp < linejs[c].compativel.length;cComp++ ){
        dadosCarro.compativel.push(linejs[c].compativel[cComp]);
      }
      continue;
    }
    if (linejs[c].codigoFabricante){      
      dadosCarro.codigomontadora = [];
      for (let cComp = 0;cComp < linejs[c].codigoFabricante.length;cComp++ ){
        marca = Object.keys(linejs[c].codigoFabricante[cComp])[0];
        codigo = Object.values(linejs[c].codigoFabricante[cComp])[0];
        montadora = {"montadora":marca,"codigo":codigo}
        dadosCarro.codigomontadora.push(montadora);
      }
      continue;
    }    
  }  
  new Produto(dadosCarro).save(
      (err, docProduto) => {
      if (err) {
        console.log(dadosCarro.codigoexterno);
        console.log(err);
      }      
    });
}