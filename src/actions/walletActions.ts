// src/actions/walletActions.ts
import { WalletData } from '../modules/connect_to_metamask';

export const SET_WALLET_DATA = 'SET_WALLET_DATA';
export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';

export interface SetWalletDataAction {
  type: typeof SET_WALLET_DATA;
  payload: WalletData;
}

export interface SetJwtTokenAction {
  type: typeof SET_JWT_TOKEN;
  payload: string;
}

export type WalletActionTypes = SetWalletDataAction | SetJwtTokenAction;

export const setWalletData = (walletData: WalletData): SetWalletDataAction => ({
  type: SET_WALLET_DATA,
  payload: walletData,
});

export const setJwtToken = (jwtToken: string): SetJwtTokenAction => ({
  type: SET_JWT_TOKEN,
  payload: jwtToken,
});