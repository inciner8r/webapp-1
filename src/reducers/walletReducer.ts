// src/reducers/walletReducer.ts
import { WalletActionTypes, SET_WALLET_DATA, SET_JWT_TOKEN } from '../actions/walletActions';
import { WalletData } from '../modules/connect_to_metamask';

const initialState: WalletState = {
  walletData: null,
  jwtToken: null,
};

// Add jwtToken to WalletState
export interface WalletState {
  walletData: WalletData | null;
  jwtToken: string | null;
}

export const walletReducer = (state = initialState, action: WalletActionTypes): WalletState => {
  switch (action.type) {
    case SET_WALLET_DATA:
      return {
        ...state,
        walletData: action.payload,
      };
    case SET_JWT_TOKEN: // Handle the new action here
      return {
      ...state,
      jwtToken: action.payload,
      };
      default:
      return state;
  }
};