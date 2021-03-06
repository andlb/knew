import { Mensagem } from './../../../model/mensagem';
import { Produto } from './../../../model/produto';
import { State } from './produto.reducers';
import * as  ProdutoActions from './produto.actions';

export interface FeatureState {
  produto: State;
}

export interface State {
  produto: Produto;
  mensagem: Mensagem;
}

export const initialState: State = {
  produto: new Produto({}),
  mensagem: null
};


export function produtoReducer(
  state = initialState,
  action: ProdutoActions.ProdutoActions
) {
  switch (action.type) {
    case ProdutoActions.NEW_PRODUTO:
    return {
      ...state,
      produto: new Produto({}),
      mensagem: null
    };
    case ProdutoActions.FAIL_PRODUTO:
    return {
      ...state,
      produto: null,
      mensagem: action.payload
    };

    case ProdutoActions.SUCCESS_PRODUTO:
    return {
      ...state,
      produto: action.payload,
      mensagem: null
    };
    case ProdutoActions.STORE_PRODUTO:
    return {
      ...state,
      produto: action.payload
    };
    case ProdutoActions.APOS_SALVAR:
    return {
      ...state,
      produto: null,
      mensagem: action.payload
    };
    default:
      return state;
  }
}

