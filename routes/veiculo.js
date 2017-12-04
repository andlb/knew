const express = require('express');
const app = express();
const Anomodelo = require('../model/anomodelo');

module.exports = router => {
  router.get('/:conteudo', (req, res) => {
    let retorno = { success: false, message: "", retorno:{}};
    console.log('entrou ak');
    if (!req.params.conteudo){
      retorno.message = "Não foi informado o conteudo";
      res.json(retorno);
    }
    GetModelo(req.params.conteudo,req,res);
  });
  return router;
};

// receive a string value and return what match.
function GetModelo(modelo,req, res) {
  let retorno = [];
  let arModelo = modelo.split(" ");
  for (let tModelo in arModelo) {
    arModelo[tModelo] = '\"' + arModelo[tModelo] + '\"';
  }
  arModelo = arModelo.join(" ");

  Anomodelo.find({$text:{$search:arModelo}},{descricaocompleta:1},(err, doModelos) => {
    console.log('apos ser realizado a pesquisa');
    if (err) {
      console.log('err ' + err);
      //return retorno;
      res.json(retorno);
    }else{      
      //return doModelos;
      res.json(doModelos);
    }
    
  });
}
