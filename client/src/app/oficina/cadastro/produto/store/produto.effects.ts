import { Produto } from './../../../model/produto';
import { ProdutoService } from './../produto.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';

import * as fromProduto from '../store/produto.reducers';
import * as ProdutoActions from './produto.actions';
import { Mensagem } from '../../../model/mensagem';

@Injectable()
export class ProdutoEffects {
  @Effect()
  produtoSearch = this.actions$
    .ofType(ProdutoActions.SEARCH_PRODUTO)
    .switchMap((action: ProdutoActions.SearchProduto) => {
      return this.produtoService.getProduto(action.payload, action.usuario);
    })
    .map((retorno: any) => {
      if (!retorno.success) {
        // erro
        const oMessagem = new Mensagem();
        oMessagem.message = retorno.message;
        oMessagem.erro = true;
        return{
          type: ProdutoActions.FAIL_PRODUTO,
          payload: oMessagem
        };
      }
      return{
        type: ProdutoActions.SUCCESS_PRODUTO,
        payload: new Produto(retorno.produto)
      };
    });

    @Effect()
    ProdutoStore = this.actions$
      .ofType(ProdutoActions.STORE_PRODUTO)
      .withLatestFrom(this.store.select('produto'))
      .switchMap(([action, state]) => {
        return this.produtoService.salvar(state.produto);
      })
      .map(
        (retorno: any) => {
          const oMessagem = new Mensagem();
          oMessagem.message = retorno.message;
          if (!retorno.success) {
            oMessagem.erro = true;
          } else {
            oMessagem.erro = false;
          }
          return{
            type: ProdutoActions.APOS_SALVAR,
            payload: oMessagem
          };
        }
      );

    constructor(
      private actions$: Actions,
      private produtoService: ProdutoService,
      private store: Store<fromProduto.FeatureState>
    ) {}


}
