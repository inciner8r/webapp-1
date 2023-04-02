// src/reducers/walletReducer.ts
import { WalletActionTypes, SET_WALLET_DATA } from '../actions/walletActions';
import { WalletData } from '../modules/connect_to_metamask';

export interface WalletState {
  walletData: WalletData | null;
}

const initialState: WalletState = {
  walletData: null,
};

export const walletReducer = (state = initialState, action: WalletActionTypes): WalletState => {
  switch (action.type) {
    case SET_WALLET_DATA:
      return {
        ...state,
        walletData: action.payload,
      };
    default:
      return state;
  }
};
