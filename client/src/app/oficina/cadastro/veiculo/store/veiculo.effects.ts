import { VeiculoService } from './../veiculo.service';
import { Veiculo } from './../../../model/veiculo';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromVeiculo from '../store/veiculo.reducers';
import * as VeiculoActions from './veiculo.actions';
import { veiculoReducer } from '../store/veiculo.reducers';

import { Mensagem } from '../../../model/mensagem';

@Injectable()
export class VeiculoEffects {
  @Effect()
  veiculoSearch = this.actions$
    .ofType(VeiculoActions.SEARCH_VEICULO)
    .switchMap((action: VeiculoActions.SearchVeiculo) => {
      return this.veiculoService.buscaPlaca(action.payload);
    })
    .map(
      (veiculo) => {
        console.log('veiculo');
        console.log(veiculo);
        console.log('terminando ');
        return {
          type: VeiculoActions.SET_VEICULO,
          payload: veiculo
        };
      }
    );
    @Effect()
    veiculoStore = this.actions$
      .ofType(VeiculoActions.STORE_VEICULO)
      .withLatestFrom(this.store.select('veiculo'))
      .switchMap(([action, state]) => {
        return this.veiculoService.salvar(state.veiculo);
      })
      .map(
        (retornoSalvar: any) => {

          const mensagem = new Mensagem();
          if (retornoSalvar.success) {
            mensagem.message = retornoSalvar.message;
            mensagem.erro = false;
          } else {
            mensagem.message = retornoSalvar.message;
            mensagem.erro = true;
          }
          return{
            type: VeiculoActions.SUCCESS_VEICULO,
            payload: mensagem
          };
        }
      );

  constructor(
    private actions$: Actions,
    private veiculoService: VeiculoService,
    private store: Store<fromVeiculo.FeatureState>
  ) {}
}
