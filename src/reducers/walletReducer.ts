// src/reducers/walletReducer.ts
import { WalletActionTypes, SET_WALLET_DATA, SET_USER_CONNECTION, SET_JWT_TOKEN, DELETE_JWT_TOKEN, DELETE_WALLET_DATA } from '../actions/walletActions';
import { WalletData } from '../modules/connect_to_metamask';

const initialState: WalletState = {
  walletData: null,
  jwtToken: null,
  userConnected: false,
};

// Add jwtToken to WalletState
export interface WalletState {
  walletData: WalletData | null;
  jwtToken: string | null;
  userConnected: boolean;
}

export const walletReducer = (state = initialState, action: WalletActionTypes): WalletState => {
  switch (action.type) {
    case SET_WALLET_DATA:
      return {
        ...state,
        walletData: action.payload,
      };
    case SET_USER_CONNECTION:
      return{
        ...state,
        userConnected: action.payload,
      }
    case SET_JWT_TOKEN: // Handle the new action here
      return {
      ...state,
      jwtToken: action.payload,
      };
    case DELETE_JWT_TOKEN:
      return {
        ...state,
        jwtToken: null,
      };
    case DELETE_WALLET_DATA:
        return {
          ...state,
          walletData: null,
        };
      default:
      return state;
  }
};