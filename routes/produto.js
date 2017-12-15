const express = require('express');
const app = express();
const Produto = require('../model/produto');
const moment = require("moment");

module.exports = router => {
  router.get('/pesquisa/:conteudo', (req, res) => {
    console.log('entrou em pesquisa conteudo');
    getProdutoPesquisa(req,res);
  });

  router.get('/consulta/:codigo/:usuario', (req, res) => {

    getProduto(req,res);
  });

  router.post('/salvarproduto',  (req, res) => {    
    salvarProduto(req, res);
  });
  return router;  
}


function salvarProduto(req, res) {  
  let retorno = {
    editar:false,
    success:false,
    message:null,
    produto:null
  };
  try{      
    produto = req.body;
    Produto.findOne({_id:produto.id})
    .then(prodSave => {
      if (!prodSave) {
        prodSave = new Produto();        
      }
      prodSave.descricao = produto.descricao;
      prodSave.complemento = produto.complemento;
      prodSave.NCM = produto.NCM;
      prodSave.fabricante = produto.fabricante;
      prodSave.altura = produto.altura;
      prodSave.alturaunidade = produto.alturaunidade;
      prodSave.largura = produto.largura;
      prodSave.larguraunidade = produto.larguraunidade;
      prodSave.comprimento = produto.comprimento;
      prodSave.comprimentounidade = produto.comprimentounidade;
      prodSave.pesobruto = produto.pesobruto;
      prodSave.pesounidade = produto.pesounidade;
      prodSave.codigobarras = produto.codigobarras;
      prodSave.codigomontadora = produto.codigomontadora;
      prodSave.imagem = produto.imagem;
      prodSave.linha = produto.linha;
      prodSave.compativel = produto.compativel;
      prodSave.situacao = produto.situacao;
      prodSave.ultimaalteracao = {
        usuario: '',
        datahora: new Date()
      };
      prodSave.edicao = null;
      prodSave.save()
      .then(doc => {
        
        let retorno = {
          editar:false,
          success:true,
          message:'Dados '+doc._id+' atualizados com sucesso',
          produto:null
        };        
        res.json(retorno);
      })
      .catch(ex=> { 
        console.log(ex);
        mensagem = ex.message;
        if (ex.code == 11000) {
          mensagem = 'Código de barra '+ prodSave.codigobarras+ ' está duplicado';
          console.log(ex.toJSON());
        }
        let retorno = {
          editar:false,
          success:false,
          message:mensagem,
          produto:null
        };        
        res.json(retorno);    
      });
    });
  } catch (ex) {
    retorno.success = false;
    console.log(ex);
    retorno.message = ex.message;
  }
}

// return product information.
function getProduto(req,res){
  let retorno = {
    editar:false,
    success:false,
    message:null,
    produto:null};
  if (!req.params.codigo){
    retorno.message = "Código não informado";
    return res.json(retorno);
  }
  Produto.findOne(
    { _id: req.params.codigo}
  )
  .then((produto)=>{
    if (!produto){
      retorno.message = "Produto não encontrado";
      return res.json(retorno);
    }
    //is editing
    if ((moment() < moment(produto.edicao.datahora) )    
        && req.params.usuario != produto.edicao.usuario){      
      retorno.message = "Produto está em edicão pelo usuário "+ produto.edicao.usuario;     
    }
    produto.edicao.usuario = req.params.usuario;
    produto.edicao.datahora = moment().add(2, 'minutes').toDate();
    new Produto(produto).save();     
    retorno.success=true;
    retorno.editar = true;
    retorno.produto=produto;    
    return res.json(retorno);
  })
  .catch(err =>{
    retorno.message = err;
    return res.json(retorno);
  });  
}

function getProdutoPesquisa(req,res) {  
  if (!req.params.conteudo){
    res.json({});
  }
  conteudo = PesquisaText(req.params.conteudo);  
  Produto.find(
    { $text: { $search: conteudo } },
    {
      descricao:1,
      fabricante:1,
      imagem:1,      
    }
  )
  .limit(300)
  .then(doProdutos => {
    let arraProd = [];
    for (let cDoc in doProdutos){
      let prod = {};
      prod.descricao = doProdutos[cDoc].descricao;
      prod.fabricante = doProdutos[cDoc].fabricante.marca;
      prod.codigofab = doProdutos[cDoc].fabricante.codigo;
      prod.imagem = doProdutos[cDoc].imagem[0];
      prod.codigo = doProdutos[cDoc]._id;
      arraProd.push(prod);
    }
    return res.json(arraProd);  
  })
  .catch(err => res.json({}));
}

function PesquisaText(conteudo){
  let retorno = [];
  let arConteudo = conteudo.split(' ');
  for (let tConteudo in arConteudo) {
    arConteudo[tConteudo] = '"' + arConteudo[tConteudo] + '"';
  }
  return arConteudo.join(' ');
}
