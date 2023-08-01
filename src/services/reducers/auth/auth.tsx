import {
  USER_AUTHORIZED,
  STORE_USER,
  STORE_PASSWORD,
  CLEAR_USER,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  RESTORE_PASS_REQUEST,
  RESTORE_PASS_SUCCESS,
  RESTORE_PASS_FAIL,
  RESET_PASS_REQUEST,
  RESET_PASS_SUCCESS,
  RESET_PASS_FAIL,
  TRegisterUserActions,
  TRestorePasswordActions,
  TResetPasswordActions,
  TLoginActions,
  TGetUserActions,
  TLogoutActions,
  TPatchUserActions,
  TUserActions
} from "../../actions/auth/auth";


export type TUserState = {
  isAuthorized: boolean,
  user: object,
  password: null | undefined | string,
  getUserRequest: boolean,
  getUserSuccess: boolean,
  getUserFail: boolean,
  patchUserRequest: boolean,
  patchUserSuccess: boolean,
  patchUserFail: boolean,
  registerRequest: boolean,
  registerSuccess: boolean,
  registerFailed: boolean,
  loginRequest: boolean,
  loginSuccess: boolean,
  loginFailed: boolean,
  logoutRequest: boolean,
  logoutSuccess: boolean,
  logoutFailed: boolean,
  restoreRequest: boolean,
  restoreSuccess: boolean,
  restoreFailed: boolean,
  resetRequest: boolean,
  resetSuccess: boolean,
  resetFailed: boolean,
  isLoading: boolean,
  isLogin: boolean,
}

const initialState: TUserState = {
  isAuthorized: false,
  user: {},
  password: null,
  getUserRequest: false,
  getUserSuccess: false,
  getUserFail: false,
  patchUserRequest: false,
  patchUserSuccess: false,
  patchUserFail: false,
  registerRequest: false,
  registerSuccess: false,
  registerFailed: false,
  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,
  logoutRequest: false,
  logoutSuccess: false,
  logoutFailed: false,
  restoreRequest: false,
  restoreSuccess: false,
  restoreFailed: false,
  resetRequest: false,
  resetSuccess: false,
  resetFailed: false,
  isLoading: false,
  isLogin: false,
};

export const authReducer = (state = initialState, action: TUserActions | TRegisterUserActions | TRestorePasswordActions | 
  TResetPasswordActions | TLoginActions | TGetUserActions | TLogoutActions | TPatchUserActions): TUserState => {
  switch (action.type) {
    case USER_AUTHORIZED: {
      return {
        ...state,
        isAuthorized: action.isAuthorized
      }
    }
    case STORE_USER: {
      return {
        ...state,
        user: action.user
      }
    }
    case STORE_PASSWORD: {
      return {
        ...state,
        password: action.password
      }
    }
    case CLEAR_USER: {
      return {
        ...state,
        user: {}
      }
    }
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserRequest: true,
        patchUserSuccess: false,
        patchUserFail: false
      }
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserSuccess: true,
        patchUserFail: false
      }
    }
    case PATCH_USER_FAIL: {
      return {
        ...state,
        patchUserRequest: false,
        patchUserSuccess: false,
        patchUserFail: true
      }
    }
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerSuccess: false,
        registerFailed: false
      }
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
				registerSuccess: true,
				registerFailed: false
      };
    }
    case REGISTER_FAIL: {
      return {
        ...state,
        registerRequest: false,
				registerSuccess: false,
				registerFailed: true
      }
    }
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        loginRequest: false,
				loginSuccess: true,
				loginFailed: false
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        loginRequest: false,
				loginSuccess: false,
				loginFailed: true
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
				logoutSuccess: true,
				logoutFailed: false
      };
    }
    case LOGOUT_FAIL: {
      return {
        ...state,
        logoutRequest: false,
				logoutSuccess: false,
				logoutFailed: true
      }
    }
    case RESTORE_PASS_REQUEST: {
      return {
        ...state,
        restoreRequest: true
      }
    }
    case RESTORE_PASS_SUCCESS: {
      return {
        ...state,
        restoreRequest: false,
				restoreSuccess: true,
				restoreFailed: false
      };
    }
    case RESTORE_PASS_FAIL: {
      return {
        ...state,
        restoreRequest: false,
				restoreSuccess: false,
				restoreFailed: true
      }
    }
    case RESET_PASS_REQUEST: {
      return {
        ...state,
        resetRequest: true
      }
    }
    case RESET_PASS_SUCCESS: {
      return {
        ...state,
        resetRequest: false,
				resetSuccess: true,
				resetFailed: false
      };
    }
    case RESET_PASS_FAIL: {
      return {
        ...state,
        resetRequest: false,
				resetSuccess: false,
				resetFailed: true
      }
    }
    default: {
      return state;
    }
  }
}
