import { Mensagem } from './../../../model/mensagem';
import { Veiculo } from './../../../model/veiculo';
import { Action } from '@ngrx/store';

export const NEW_VEICULO = 'NEW_VEICULO';
export const SEARCH_VEICULO = 'SEARCH_VEICULO';
export const SET_VEICULO = 'SET_VEICULO';
export const STORE_VEICULO = 'STORE_VEICULO';
export const SUCCESS_VEICULO = 'SUCCESS_VEICULO';


export class SearchVeiculo implements Action {
  readonly type = SEARCH_VEICULO;
  constructor(public payload: string) {
  }
}

export class SetVeiculo implements Action {
  readonly type = SET_VEICULO;
  constructor(public payload: Veiculo) {}
}

export class StoreVeiculo implements Action {
  readonly type = STORE_VEICULO;
  constructor(public payload: Veiculo) {}
}

export class SuccessVeiculo implements Action {
  readonly type = SUCCESS_VEICULO;
  constructor(public payload: Mensagem) {}
}

export class NewVeiculo implements Action {
  readonly type = NEW_VEICULO;
}

export type VeiculoActions =
  NewVeiculo |
  SearchVeiculo|
  SetVeiculo|
  StoreVeiculo|
  SuccessVeiculo;
