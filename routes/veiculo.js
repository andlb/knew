const express = require('express');
const app = express();
const Anomodelo = require('../model/anomodelo');
const Modelo = require('../model/modelo');
const Marca = require('../model/marca');

module.exports = router => {

  router.get('/anomodelo/:conteudo', (req, res) => {
    let retorno = { success: false, message: '', retorno: {} };
    if (!req.params.conteudo) {
      retorno.message = 'Não foi informado o conteudo';
      res.json(retorno);
    }
    GetAnoModelo(req.params.conteudo, req, res);
  });

  // return marcas
  router.get('/marcas', (req, res) => {
    let retorno = { success: false, message: '', retorno: {} };
    GetMarcas(req, res);
    return;
  });

  // input marca id and return modelo.
  router.get('/modelo/:marca', (req, res) => {
    let retorno = { success: false, message: '', retorno: {} };
    if (!req.params.marca) {
      retorno.message = 'Não foi informada a marca';
      res.json(retorno);
    }
    GetModelo(req, res);
  });

  return router;
};
// return all car marcas
function GetMarcas(req, res) {
  let retorno = [];
  Marca.find({}, { idfipe: 1, marca: 1 }).sort({marca:1})
    .then(marca => {
      return res.json(marca);
    })
    .catch(err => {
      return res.json(retorno);
    });
}
// return all car models (modelo)
function GetModelo(req, res, marca) {
  let retorno = [];
  let idMarca = req.params.marca;
  Modelo.find({ idmarca:  idMarca }, 
  { modelo: 1, idfipe: 1, idmarca: 1 })
  .sort({modelo:1})
    .then(modelos => res.json(modelos))
    .catch(err => res.json(retorno));
}

// receive a string value and return what match.
function GetAnoModelo(modelo, req, res) {
  let retorno = [];
  let arModelo = modelo.split(' ');
  for (let tModelo in arModelo) {
    arModelo[tModelo] = '"' + arModelo[tModelo] + '"';
  }
  arModelo = arModelo.join(' ');
  Anomodelo.find(
    { $text: { $search: arModelo } },
    {
      descricaocompleta: 1,
      idmodelo: 1,
      idmarca: 1,
      idfipe: 1
    }
  )
    .then(doModelos => res.json(doModelos))
    .catch(err => res.json(retorno));
}
