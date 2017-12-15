import { Observable } from 'rxjs/Observable';
import { Produto } from './../../model/produto';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';


@Injectable()
export class ProdutoService {
  constructor(private http: HttpClient) {}

  readonly ROOT_URL = 'http://localhost:8080/produto/';

  getProdutosList(conteudo) {
    const url = this.ROOT_URL + 'pesquisa/' + conteudo;
    return this.http.get<any[]>(url);
  }

  getProduto(codigo, usuario) {
    const url = this.ROOT_URL + 'consulta/' + codigo + '/' + usuario;
    return this.http.get<any[]>(url);
  }

  salvar(produto: Produto) {
    const url = this.ROOT_URL + 'salvarproduto';
    return this.http.post(url, produto);
  }

}
