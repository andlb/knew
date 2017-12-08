const express = require('express');
const app = express();

const mongoose = require('mongoose');
const config = require('../../config/database')['development'];
const Marca = require('../../model/marca');
const Modelo = require('../../model/modelo');
const Anomodelo = require('../../model/anomodelo');
const client = require('node-rest-client').Client;

mongoose.Promise = global.Promise;
var oClient = new client();

inicio();
var contador = 4000;
function inicio() {
  try {
    mongoose.connect(config.uri, err => {
      if (err) {
        console.log('could not connect to database', err);
        return;
      } else {
        oClient.get(
          'http://fipeapi.appspot.com/api/1/carros/marcas.json',
          function(marca, response) {
            if (!response) return;
            if (response.statusCode !== 200) return;
            for (let cData in marca) {
              gravaMarca(marca[cData]);
              buscaModelo(marca[cData]);
            }
          }
        );
      }
    });
  } catch (ex) {
    console.log('Erro no inicio');
    console.log(ex);
  }
}

function buscaModelo(marca) {
  try {
    let idMarca = marca.id;
    let oClient = new client();
    oClient.get(
      'http://fipeapi.appspot.com/api/1/carros/veiculos/' + idMarca + '.json',
      function(dataModelo, response) {
        if (!response) return;
        if (response.statusCode != 200) return;
        contador = contador + 2000;
        for (let cModelo in dataModelo) {          
          setTimeout(function() {
            //busca os modelos na api
            buscaAnoModelo(marca, dataModelo[cModelo])},contador);          
            //grava os mdelos.
            gravaModelo(marca, dataModelo[cModelo]);
        }
      }
    );
  } catch (ex) {
    console.log('Err no busca modelo');
    console.log(ex);
  }
}

function buscaAnoModelo(marca, modelo) {
  try {
    let idMarca = marca.id;
    let idModelo = modelo.id;

    let oClient = new client();
    let url = 'http://fipeapi.appspot.com/api/1/carros/veiculo/' +
    idMarca +
    '/' +
    idModelo +
    '.json'
    oClient.get(url,function(dataAnoModelo, response) {        
        if ((!response) || (response.statusCode != 200)) {
          console.log("status diferente de 200");
          console.log(url);
        }else{
          for (let cAnoModelo in dataAnoModelo) {          
            gravaAnoModelo(marca, modelo, dataAnoModelo[cAnoModelo]);
          }
        }
      }
    );
  } catch (ex) {
    console.log('erro no busca ano modelo');
    console.log(ex);
  }
}

function gravaMarca(marca) {
  try {
    let oMarca = {
      _id:marca.id,
      marca: marca.name,
      key: marca.key,
      idfipe: marca.id,
      _id:marca.id
    };
    Marca.update(
      { idfipe: oMarca.idfipe },
      oMarca,
      { upsert: true },
      (err, docMarca) => {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (ex) {
    console.log('Erro no grava marca');
    console.log(ex);
  }
}

function gravaModelo(marca, modelo) {
  try {
    let oModelo = {
      _id:modelo.id,
      modelo: modelo.name,
      key: modelo.key,
      idfipe: modelo.id,
      idmarca: marca.id
    };
    Modelo.update(
      { idfipe: oModelo.idfipe },
      oModelo,
      { upsert: true },
      (err, docmodelo) => {
        if (err) {
          console.log(err);
        }
      }
    );
  } catch (ex) {
    console.log('erro no grava modelo');
    console.log(ex);
  }
}

function gravaAnoModelo(marca, modelo, anomodelo) {
  
  try {
    let oAnoModelo = {
      _id:marca.id+"|"+modelo.id+"|"+anomodelo.id,
      descricaocompleta: modelo.name + ' ' + anomodelo.name,
      ano: anomodelo.name,
      idmodelo: modelo.id,
      idmarca: marca.id,
      idfipe: anomodelo.id
    };
    let query = 
      {
        idfipe: oAnoModelo.idfipe,
        idmarca: marca.id,
        idmodelo: modelo.id
      };      
    Anomodelo.update(
      query,
      oAnoModelo,
      { upsert: true },
      (err, documento) => {
        if (err) {
          console.log(err);
        }else{
          console.log(documento);
        }
      }
    );
  } catch (ex) {
    console.log('Erro ao gravarAnomodelo ');
    console.log(ex);
  }
}

/*

async function gravaAnoModelo(modelo,marca, ano){
  Modelo.update({idfipe:modelo.idfipe},modelo,{upsert:true},(err,docmodelo) => {
    if (err) {
      console(err);
    }else {
    if (docmodelo) {
        console.log(docmodelo);
      }      
    }
  });
async function gravaMarca(marca) {  
  marca = {
    marca: marca.name,
    key: marca.key,
    idfipe: marca.id,
  };  
  


  /*Marca.update({idfipe:marca.idfipe},marca,{upsert:true },(err,docMarca) => {
    if (err) {
      console.log(err);
    }else{
      console.log(docMarca.ok)
      if (docMarca.ok){        
        
      }
    }    
  });
}  

}
*/
