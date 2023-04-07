// src/actions/walletActions.ts
export const SET_WALLET_DATA = 'SET_WALLET_DATA';
export const SET_JWT_TOKEN = 'SET_JWT_TOKEN';
export const DELETE_JWT_TOKEN = 'DELETE_JWT_TOKEN';
export const DELETE_WALLET_DATA = 'DELETE_WALLET_DATA';
export const SET_USER_CONNECTION = 'SET_USER_CONNECTION';


export interface DeleteJwtTokenAction {
  type: typeof DELETE_JWT_TOKEN;
}

export interface SetWalletDataAction {
  type: typeof SET_WALLET_DATA;
  payload: string | undefined;
}

export interface SetJwtTokenAction {
  type: typeof SET_JWT_TOKEN;
  payload: string | null; // Allow null as a valid value
}

export interface SetUserConnectionAction {
  type: typeof SET_USER_CONNECTION;
  payload: boolean;
}

export interface DeleteWalletDataAction {
  type: typeof DELETE_WALLET_DATA;
}

export type WalletActionTypes = SetUserConnectionAction | SetWalletDataAction | SetJwtTokenAction | DeleteJwtTokenAction | DeleteWalletDataAction;

export const setWalletData = (walletData: string | undefined): SetWalletDataAction => ({
  type: SET_WALLET_DATA,
  payload: walletData,
});

export const setJwtToken = (jwtToken: string | null): SetJwtTokenAction => ({
  type: SET_JWT_TOKEN,
  payload: jwtToken,
});

export const setUserConnection = (userConnected: boolean ): SetUserConnectionAction => ({
  type: SET_USER_CONNECTION,
  payload: userConnected,
});

export const deleteJwtToken = (): DeleteJwtTokenAction => ({
  type: DELETE_JWT_TOKEN,
});

export const deleteWalletData = (): DeleteWalletDataAction => ({
  type: DELETE_WALLET_DATA,
});