import { Action } from '@ngrx/store';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Produto } from '../../../model/produto';
export const NEW_PRODUTO = 'NEW_PRODUTO';
export const SEARCH_PRODUTO = 'SEARCH_PRODUTO';
export const FAIL_PRODUTO = 'FAIL_PRODUTO';
export const STORE_PRODUTO = 'STORE_PRODUTO';
export const SUCCESS_PRODUTO = 'SUCCESS_PRODUTO';
export const APOS_SALVAR = 'APOS_SALVAR';


export class NewProduto implements Action {
  readonly type = NEW_PRODUTO;
}
export class SearchProduto implements Action {
  readonly type = SEARCH_PRODUTO;
  constructor(public payload: string, public usuario: string) {
  }
}

export class FailProduto implements Action {
  readonly type = FAIL_PRODUTO;
  constructor(public payload: Message) {
  }
}
export class SuccessProduto implements Action {
  readonly type = SUCCESS_PRODUTO;
  constructor(public payload: Produto) {
  }
}

export class AposSalvar implements Action {
  readonly type = APOS_SALVAR;
  constructor(public payload: Message) {
  }
}

export class StoreProduto implements Action {
  readonly type = STORE_PRODUTO;
  constructor(public payload: Produto) {}
}

export type ProdutoActions =
    NewProduto |
    SearchProduto|
    FailProduto |
    StoreProduto |
    AposSalvar |
    SuccessProduto;
