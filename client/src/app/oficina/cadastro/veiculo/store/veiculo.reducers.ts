import { State } from './veiculo.reducers';
import { Veiculo } from './../../../model/veiculo';

import * as VeiculoActions from './veiculo.actions';

export interface FeatureState {
  veiculos: State;
}

export interface State {
  veiculos: Veiculo[];
}

const initialState: State = {
  veiculos: []
};

export function veiculoReducer(
  state = initialState,
  action: VeiculoActions.VeiculoActions
) {
  switch (action.type) {
    case VeiculoActions.SET_VEICULO:
      return {
        ...state,
        veiculos: action.payload
      };
    default:
      return state;
  }
}
