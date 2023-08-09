import {
  registerUrl,
  loginUrl,
  logoutUrl,
  passwordRestoreUrl,
  passwordResetUrl,
  accessTokenLifetime,
  refreshTokenLifetime,
  getCookie, setCookie, deleteCookie,
  requestData, getUserFetch, patchUserFetch
} from '../../../utils/data';

import { AppDispatch, AppThunk } from '../../../utils/prop-types';

export const USER_AUTHORIZED: 'USER_AUTHORIZED' = 'USER_AUTHORIZED';
export const STORE_USER: 'STORE_USER' = 'STORE_USER';
export const STORE_PASSWORD: 'STORE_PASSWORD'= 'STORE_PASSWORD';
export const CLEAR_USER: 'CLEAR_USER' = 'CLEAR_USER';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAIL: 'GET_USER_FAIL' = 'GET_USER_FAIL';

export const PATCH_USER_REQUEST: 'PATCH_USER_REQUEST' = 'PATCH_USER_REQUEST';
export const PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS' = 'PATCH_USER_SUCCESS';
export const PATCH_USER_FAIL: 'PATCH_USER_FAIL' = 'PATCH_USER_FAIL';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS';
export const REGISTER_FAIL: 'REGISTER_FAIL' = 'REGISTER_FAIL';

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAIL: 'LOGIN_FAIL' = 'LOGIN_FAIL';

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL: 'LOGOUT_FAIL' = 'LOGOUT_FAIL';

export const RESTORE_PASS_REQUEST: 'RESTORE_PASS_REQUEST' = 'RESTORE_PASS_REQUEST';
export const RESTORE_PASS_SUCCESS: 'RESTORE_PASS_SUCCESS' = 'RESTORE_PASS_SUCCESS';
export const RESTORE_PASS_FAIL: 'RESTORE_PASS_FAIL' = 'RESTORE_PASS_FAIL';

export const RESET_PASS_REQUEST: 'RESET_PASS_REQUEST' = 'RESET_PASS_REQUEST';
export const RESET_PASS_SUCCESS: 'RESET_PASS_SUCCESS' = 'RESET_PASS_SUCCESS';
export const RESET_PASS_FAIL: 'RESET_PASS_FAIL' = 'RESET_PASS_FAIL';

type TUserAuthorized = {
  readonly type: typeof USER_AUTHORIZED,
  isAuthorized: boolean
}
type TStoreUser = {
  readonly type: typeof STORE_USER,
  user: {
    email: string,
    name: string,
    password?: string
  }
}
type TStorePassowrd = {
  readonly type: typeof STORE_PASSWORD,
  password: string 
}
type TClearConstructor = {
  readonly type: typeof CLEAR_USER,
}

type TRestorePasswordRequest = {
  readonly type: typeof RESTORE_PASS_REQUEST,
}

type TRestorePasswordSuccess = {
  readonly type: typeof RESTORE_PASS_SUCCESS,
  success?: boolean,
}

type TRestorePasswordFailed = {
  readonly type: typeof RESTORE_PASS_FAIL,
  error?: string,
}

type TResetSuccess = {
  readonly type: typeof RESET_PASS_SUCCESS,
  success: boolean,
}

type TRegisterUserRequest = {
  readonly type: typeof REGISTER_REQUEST,
}

type TRegisterUserSuccess = {
  readonly type: typeof REGISTER_SUCCESS,
  success?: boolean,
  email?: string,
  name?: string,
  accessToken?: string,
  refreshToken?: string,
}

type TRegisterUserFailed = {
  readonly type: typeof REGISTER_FAIL,
  error?: string,
}

type TResetPasswordRequest = {
  readonly type: typeof RESET_PASS_REQUEST,
}

type TResetPasswordSuccess = {
  readonly type: typeof RESET_PASS_SUCCESS,
  reset?: boolean,
}

type TResetPasswordFailed = {
  readonly type: typeof RESET_PASS_FAIL,
  error?: string,
}

type TLoginRequest = {
  readonly type: typeof LOGIN_REQUEST,
}

type TLoginSuccess = {
  readonly type: typeof LOGIN_SUCCESS,
  authorizedUser?: boolean,
  accessToken?: string,
  refreshToken?: string,
  email?: string,
  name?: string,
  success?: boolean,
}

type TLoginFailed = {
  readonly type: typeof LOGIN_FAIL,
  error?: string,
}

type TGetUserRequest = {
  readonly type: typeof GET_USER_REQUEST,
}

type TGetUserSuccess = {
  readonly type: typeof GET_USER_SUCCESS,
  email?: string,
  name?: string,
  success?: boolean,
}

type TGetUserFailed = {
  readonly type: typeof GET_USER_FAIL,
  error?: string,
}

type TLogoutRequest = {
  readonly type: typeof LOGOUT_REQUEST,
}

type TLogoutSuccess = {
  readonly type: typeof LOGOUT_SUCCESS,
  accessToken?: string,
  refreshToken?: string,
  success?: boolean,
}

type TLogoutFailed = {
  readonly type: typeof LOGOUT_FAIL,
  error?: string,
}

type TPatchUserRequest = {
  readonly type: typeof PATCH_USER_REQUEST,
}

type TPatchUserSuccess = {
  readonly type: typeof PATCH_USER_SUCCESS,
  email?: string,
  name?: string,
  success?: boolean,
}


type TPatchUserFailed = {
  readonly type: typeof PATCH_USER_FAIL,
  error?: string,
}



export function registerProfile(data: object) {
  return function (dispatch: AppDispatch) {
    dispatch({ type: REGISTER_REQUEST });
    requestData(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => dispatch({ type: REGISTER_SUCCESS }))
      .catch(() => dispatch({ type: REGISTER_FAIL }))
  }
};

export function login(data: object){
  console.log(data);
  return async function (dispatch: AppDispatch) {
    console.log(data);
    
    dispatch({ type: LOGIN_REQUEST });
    requestData(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => {
        dispatch({ type: LOGIN_SUCCESS });
        setCookie(
          'accessToken',
          data.accessToken.split('Bearer ')[1],
          { expires: accessTokenLifetime }
        );
        setCookie(
          'refreshToken',
          data.refreshToken,
          { expires: refreshTokenLifetime }
        );
        dispatch({ type: STORE_USER, user: data.user });
        dispatch({ type: USER_AUTHORIZED, isAuthorized: true });
      })
      .catch(() => dispatch({ type: LOGIN_FAIL }));
  }
};


export function getUser(){
  return async function (dispatch: AppDispatch) {
    dispatch({ type: GET_USER_REQUEST });
    getUserFetch()
      .then(res => {
        if (res?.success) {
          dispatch({ type: GET_USER_SUCCESS });
          dispatch({ type: STORE_USER, user: res.user });
          dispatch({ type: USER_AUTHORIZED, isAuthorized: true })
        } else {
          dispatch({ type: GET_USER_FAIL })
        }
      })
      .catch(() => dispatch({ type: GET_USER_FAIL }))
  }
};

export function patchUser(data: object) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: PATCH_USER_REQUEST });
    patchUserFetch(data)
      .then(res => {
        if (res?.success) {
          dispatch({ type: PATCH_USER_SUCCESS });
          dispatch({
            type: STORE_USER,
            user: res.user
          })
        } else {
          dispatch({ type: PATCH_USER_FAIL })
        }
      })
      .catch(() => dispatch({ type: PATCH_USER_FAIL }))
  }
};




export function logout() {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: LOGOUT_REQUEST });
    requestData(logoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: getCookie('refreshToken') })
    })
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        dispatch({
          type: USER_AUTHORIZED,
          isAuthorized: false
        });
        dispatch({ type: CLEAR_USER });
      })
      .catch(() => dispatch({ type: LOGOUT_FAIL }))
  }
};

export function restorePassword(data: object) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: RESTORE_PASS_REQUEST });
    requestData(passwordRestoreUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => dispatch({ type: RESTORE_PASS_SUCCESS }))
      .catch(() => dispatch({ type: RESTORE_PASS_FAIL }));
  }
};

export function resetPassword(data: object) {
  return async function (dispatch: AppDispatch) {
    dispatch({ type: RESET_PASS_REQUEST });
    requestData(passwordResetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(() => dispatch({ type: RESET_PASS_SUCCESS }))
      .catch(() => dispatch({ type: RESET_PASS_FAIL }));
  }
};


export type TRestorePasswordActions = TRestorePasswordRequest | TRestorePasswordSuccess | TRestorePasswordFailed | TResetSuccess;
export type TRegisterUserActions = TRegisterUserRequest | TRegisterUserSuccess | TRegisterUserFailed;
export type TResetPasswordActions = TResetPasswordRequest | TResetPasswordSuccess | TResetPasswordFailed;
export type TLoginActions = TLoginRequest | TLoginSuccess | TLoginFailed;
export type TGetUserActions = TGetUserRequest | TGetUserSuccess | TGetUserFailed;
export type TLogoutActions = TLogoutRequest | TLogoutSuccess | TLogoutFailed;
export type TPatchUserActions = TPatchUserRequest | TPatchUserSuccess | TPatchUserFailed;
export type TUserActions = TUserAuthorized | TStoreUser | TStorePassowrd | TClearConstructor;