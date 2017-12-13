const express = require('express');
const app = express();
const Produto = require('../model/produto');

module.exports = router => {
  router.get('/pesquisa/:conteudo', (req, res) => {
    GetProdutoPesquisa(req,res);
  });

  router.get('/produto/:codigo', (req, res) => {
    GetProduto(req,res);
  });

  return router;  
}
// return product information.
function GetProduto(req,res){
  let retorno = {success:false,message:null,produto:null};
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
    retorno.success=true;
    retorno.produto=produto;
    return res.json(retorno);
  })
  .catch(err =>{
    retorno.message = err;
    return res.json(retorno);
  });  
}



function GetProdutoPesquisa(req,res) {  
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
  
