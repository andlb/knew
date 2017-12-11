const express = require('express');
const app = express();
const Produto = require('../model/produto');

module.exports = router => {
  router.get('/pesquisa/:conteudo', (req, res) => {
    GetDadosProduto(req,res);
  });
  return router;  
}

function GetDadosProduto(req,res) {  
  if (!req.params.conteudo){
    res.json({});
  }
  conteudo = PesquisaText(req.params.conteudo);
  Produto.find(
    { $text: { $search: conteudo } },
    {
      Nome:1,
      fabricante:1,
      imagem:1,      
    }
  )
  .then(doProdutos => res.json(doProdutos))
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
  
