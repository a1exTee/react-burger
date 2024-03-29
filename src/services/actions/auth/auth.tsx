import {
  getCookie, setCookie, deleteCookie, getUser, updateUser, login, logout, resetToken
} from '../../../utils/data';
 
import { AppDispatch, AppThunk } from '../../../utils/prop-types';

export const USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST' = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS' = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED: 'USER_LOGIN_FAILED' = 'USER_LOGIN_FAILED';
export const USER_LOGOUT: 'USER_LOGOUT' = 'USER_LOGOUT';

export const USER_DATA_REQUEST: 'USER_DATA_REQUEST' = 'USER_DATA_REQUEST';
export const USER_DATA_SUCCESS: 'USER_DATA_SUCCESS' = 'USER_DATA_SUCCESS';
export const USER_DATA_FAILED: 'USER_DATA_FAILED' = 'USER_DATA_FAILED';

export const USER_DATA_UPDATE_REQUEST: 'USER_DATA_UPDATE_REQUEST' = 'USER_DATA_UPDATE_REQUEST';
export const USER_DATA_UPDATE_SUCCESS: 'USER_DATA_UPDATE_SUCCESS' = 'USER_DATA_UPDATE_SUCCESS';
export const USER_DATA_UPDATE_FAILED: 'USER_DATA_UPDATE_FAILED' = 'USER_DATA_UPDATE_FAILED';

export const REFRESH_ACCESS_TOKEN_REQUEST: 'REFRESH_ACCESS_TOKEN_REQUEST' = 'REFRESH_ACCESS_TOKEN_REQUEST';
export const REFRESH_ACCESS_TOKEN_SUCCESS: 'REFRESH_ACCESS_TOKEN_SUCCESS' = 'REFRESH_ACCESS_TOKEN_SUCCESS';
export const REFRESH_ACCESS_TOKEN_FAILED: 'REFRESH_ACCESS_TOKEN_FAILED' = 'REFRESH_ACCESS_TOKEN_FAILED';


export interface IUserLoginRequest {
  readonly type: typeof USER_LOGIN_REQUEST; 
}
type TLoginData = {
  accessToken: string,
  refreshToken: string,
  success: boolean,
  user: {
    email: string,
    name: string,
    password?: string
  }
}
export interface IUserLoginSuccess {
  readonly type: typeof USER_LOGIN_SUCCESS;
  payload: TLoginData
}
export interface IUserLoginFailed {
  readonly type: typeof USER_LOGIN_FAILED;
}
export interface IUserLogout {
  readonly type: typeof USER_LOGOUT;
}
//-------------------------------------------------------------------
export interface IUserDataRequest {
  readonly type: typeof USER_DATA_REQUEST;
}
export interface IUserDataSuccess {
  readonly type: typeof USER_DATA_SUCCESS;
  payload: TLoginData
}
export interface IUserDataFailed {
  readonly type: typeof USER_DATA_FAILED;
}
//-------------------------------------------------------------------
export interface IUserDataUpdateRequest {
  readonly type: typeof USER_DATA_UPDATE_REQUEST;
}
export interface IUserDataUpdateSuccess {
  readonly type: typeof USER_DATA_UPDATE_SUCCESS;
  payload: TLoginData
}
export interface IUserDataUpdateFailed {
  readonly type: typeof USER_DATA_UPDATE_FAILED;
}
//-------------------------------------------------------------------
export interface IRefreshAccessTokenRequest {
  readonly type: typeof REFRESH_ACCESS_TOKEN_REQUEST;
}
export interface IRefreshAccessTokenSuccess {
  readonly type: typeof REFRESH_ACCESS_TOKEN_SUCCESS;
  payload: TLoginData
}
export interface IRefreshAccessTokenFailed {
  readonly type: typeof REFRESH_ACCESS_TOKEN_FAILED;
}


export type TLoginActions = 
  | IUserLoginRequest
  | IUserLoginSuccess
  | IUserLoginFailed
  | IUserLogout
  | IUserDataRequest
  | IUserDataSuccess
  | IUserDataFailed
  | IUserDataUpdateRequest
  | IUserDataUpdateSuccess
  | IUserDataUpdateFailed
  | IRefreshAccessTokenRequest
  | IRefreshAccessTokenSuccess
  | IRefreshAccessTokenSuccess
  | IRefreshAccessTokenFailed
  ;


export const userLoginRequest = (): IUserLoginRequest => ({
  type: USER_LOGIN_REQUEST,
});
export const userLoginSuccess = (payload: TLoginData): IUserLoginSuccess => ({
  type: USER_LOGIN_SUCCESS,
  payload
});
export const userLoginFailed = (): IUserLoginFailed => ({
  type: USER_LOGIN_FAILED,
});
export const userLogoutAction = (): IUserLogout => ({
  type: USER_LOGOUT,
});
//----------------------------------------------------------------
export const userDataRequest = (): IUserDataRequest => ({
  type: USER_DATA_REQUEST,
});
export const userDataSuccess = (payload: TLoginData): IUserDataSuccess => ({
  type: USER_DATA_SUCCESS,
  payload
});
export const userDataFailed = (): IUserDataFailed => ({
  type: USER_DATA_FAILED,
});
//----------------------------------------------------------------
export const userDataUpdateRequest = (): IUserDataUpdateRequest => ({
  type: USER_DATA_UPDATE_REQUEST,
});
export const userDataUpdateSuccess = (payload: TLoginData): IUserDataUpdateSuccess => ({
  type: USER_DATA_UPDATE_SUCCESS,
  payload
});
export const userDataUpdateFailed = (): IUserDataUpdateFailed => ({
  type: USER_DATA_UPDATE_FAILED,
});
//----------------------------------------------------------------
export const refreshAccessTokenRequest = (): IRefreshAccessTokenRequest => ({
  type: REFRESH_ACCESS_TOKEN_REQUEST,
});
export const refreshAccessTokenSuccess = (payload: TLoginData): IRefreshAccessTokenSuccess => ({
  type: REFRESH_ACCESS_TOKEN_SUCCESS,
  payload
});
export const refreshAccessTokenFailed = (): IRefreshAccessTokenFailed => ({
  type: REFRESH_ACCESS_TOKEN_FAILED,
});
//----------------------------------------------------------------


export const loginUser: AppThunk = (userInfo: {email: string, password: string}) => {
  return function (dispatch: AppDispatch) {
    dispatch(userLoginRequest());
    login(userInfo).then(res => {
      if (res && res.success) {
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        setCookie('refreshToken', res.refreshToken);
        dispatch(userLoginSuccess(res));
      }
    }).catch(e => {
      dispatch(userLoginFailed());
    })
  } 
}

export const userLogout: AppThunk = (goToPage: ()=>void) => {
  return function (dispatch: AppDispatch) {
    dispatch(userLogoutAction());
    logout().then(res => {
      if (res && res.success) {
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
        goToPage();
      }
    })
  }
}

export const getUserData: AppThunk = () => {
  
  return function (dispatch: AppDispatch) {
    dispatch(userDataRequest());
    getUser().then(res => {
      if (res && res.success) {
        dispatch(userDataSuccess(res));
      }
    }).catch(e => {
      dispatch(userDataFailed());
      refreshToken();
    })
  }
}

export const updateUserData: AppThunk =(userInfoReducer: {email: string, name: string}) => {
  return function (dispatch: AppDispatch) {
    dispatch(userDataUpdateRequest());
    updateUser(userInfoReducer).then(res => {
      if (res && res.success) {
        dispatch(userDataUpdateSuccess(res));
      }
    }).catch(e => {
      dispatch(userDataUpdateFailed());
    })
  }
}

export const refreshToken: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(refreshAccessTokenRequest());

    resetToken().then(res => {
      if (res && res.success) {
        dispatch(refreshAccessTokenSuccess(res));
        setCookie('accessToken', res.accessToken.split('Bearer ')[1]);
        setCookie('refreshToken', res.refreshToken);
        getUserData();
      }
    }).catch(e => {
      dispatch(refreshAccessTokenFailed())
    })
  }
}