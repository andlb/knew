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

@Injectable()
export class VeiculoEffects {
  @Effect()
  veiculoSearch = this.actions$
    .ofType(VeiculoActions.SEARCH_VEICULO)
    .switchMap((action: VeiculoActions.SearchVeiculo) => {
      console.log('entrou em switch');
      return this.httpClient.get
      ('http://localhost:8080/veiculo/consulta/' + action.payload,
        {
          observe: 'body',
          responseType: 'json'
        }
      );
    })
    .map(
      (veiculo) => {
        console.log('entrou em veiculo map');

        veiculo = {
          placa: 'ABC-1000',
          carro: 'CARRO 1',
          marca: 'CARRP 1',
          modelo: 'MODELO',
          versao: '2012',
          anofab: '2012',
          anomod: '2012',
          combustivel: 'GASOLINA',
          mkmedio: '1500',
          renavam: '123456789',
          chassi: '132456798',
          cor: 'BRANCO',
          acessorios: ''
        };
        console.log(veiculo);
        return {
          type: VeiculoActions.SET_VEICULO,
          payload: veiculo
        };
      }
    );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromVeiculo.FeatureState>
  ) {}
}
