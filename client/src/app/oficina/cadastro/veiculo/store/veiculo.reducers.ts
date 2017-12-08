import { Mensagem } from './../../../model/Mensagem';
import { State } from './veiculo.reducers';
import { Veiculo } from './../../../model/veiculo';

import * as VeiculoActions from './veiculo.actions';

export interface FeatureState {
  veiculo: State;
  mensagem: Mensagem;
}

export interface State {
  veiculo: Veiculo;
  mensagem: Mensagem;
}

export const initialState: State = {
  veiculo: new Veiculo({}),
  mensagem: null
};

export function veiculoReducer(
  state = initialState,
  action: VeiculoActions.VeiculoActions
) {
  switch (action.type) {
    case VeiculoActions.NEW_VEICULO:
    return {
      ...state,
      veiculo: new Veiculo({}),
      mensagem: null
    };
    case VeiculoActions.SET_VEICULO:
      return {
        ...state,
        veiculo: action.payload
      };
      case VeiculoActions.STORE_VEICULO:
      return {
        ...state,
        veiculo: action.payload
      };
      case VeiculoActions.SUCCESS_VEICULO:
      return {
        ...state,
        mensagem: action.payload
      };
    default:
      return state;
  }
}
