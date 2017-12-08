const express = require('express');
const app = express();
const Anomodelo = require('../model/anomodelo');
const Modelo = require('../model/modelo');
const Marca = require('../model/marca');
const Veiculo = require('../model/veiculo');
const sinesp = require('sinesp-nodejs');

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
  router.get('/modelo/:marca/:modeloid?', (req, res) => {
    let retorno = { success: false, message: '', retorno: {} };
    if (!req.params.marca) {
      retorno.message = 'Não foi informada a marca';
      res.json(retorno);
    }
    GetModelo(req, res);
  });

  router.get('/buscaplaca/:placa', (req, res) => {
    let retorno = { success: false, message: '', retorno: {} };
    if (!req.params.placa) {
      retorno.message = 'Não foi informada a placa';
      res.json(retorno);
    }
    BuscaPlaca(req, res);
  });

  //save the veiculo object.
  router.post('/salvar',  (req, res) => {
    let retorno = { success: false, message: '', retorno: {} };    
    let oVeiculo = req.body;
    Veiculo.update({placa:oVeiculo.placa},oVeiculo,{upsert:true})
    .then(veiculoret => {
      if (veiculoret.ok) {        
        retorno.success = true;              
        retorno.message = "Dados atualizados com sucesso";
        return res.json(retorno);
      }else{
        retorno.success = false;
        retorno.message = "Dados não foram salvos";
        return res.json(retorno);        
      }      
    })
    .catch( ex => {
      retorno.success = false;
      retorno.message = ex;
      return res.json(res);
    });
  });
  return router;
};


// return all car marcas
function GetMarcas(req, res) {
  let retorno = [];
  Marca.find({}, { idfipe: 1, marca: 1 })
    .sort({ marca: 1 })
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
  let query = {};
  query.idmarca = idMarca;
  if (req.params.modeloid) {
    query.idfipe = req.params.modeloid;
  }
  Modelo.find(query, { modelo: 1, idfipe: 1, idmarca: 1 })
    .sort({ modelo: 1 })
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

function BuscaPlaca(req, res) {
  try {
    let retorno = {};
    Veiculo.findOne({ placa: req.params.placa })
      .then(veiculo => {
        if (!veiculo) {
          let placa = req.params.placa.replace('-', '');
          sinesp.consultaPlaca(placa, function(retorno) {
            console.log(retorno);
            veiculo = {};
            if (retorno && retorno.codigoRetorno !== 1) {
              try {
                let carro =
                  retorno.modelo.split('/')[1] + ' ' + retorno.anoModelo;
                veiculo = {
                  placa: req.params.placa,
                  carro: carro,
                  anofab: retorno.ano,
                  anomod: retorno.anoModelo,
                  cor: retorno.cor
                };
              } catch (ex) {}
              res.json(veiculo);
            }
          });
        } else {
          res.json(veiculo);
        }
      })
      .catch(err => {
        console.log('entrou no erro');
        console.log(err);
        return res.json(retorno);
      });
  } catch (ex) {}
}
