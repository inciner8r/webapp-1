// src/actions/walletActions.ts
import { WalletData } from '../modules/connect_to_metamask';

export const SET_WALLET_DATA = 'SET_WALLET_DATA';

export interface SetWalletDataAction {
  type: typeof SET_WALLET_DATA;
  payload: WalletData;
}

export type WalletActionTypes = SetWalletDataAction;

export const setWalletData = (walletData: WalletData): SetWalletDataAction => ({
  type: SET_WALLET_DATA,
  payload: walletData,
});
