import { Veiculo } from './../../../model/veiculo';
import { Action } from '@ngrx/store';

export const SEARCH_VEICULO = 'SEARCH_VEICULO';
export const SET_VEICULO = 'SET_VEICULO';


export class SearchVeiculo implements Action {
  readonly type = SEARCH_VEICULO;
  constructor(public payload: string) {
  }
}

export class SetVeiculo implements Action {
  readonly type = SET_VEICULO;
  constructor(public payload: Veiculo) {}
}

export type VeiculoActions =
  SearchVeiculo|
  SetVeiculo;
