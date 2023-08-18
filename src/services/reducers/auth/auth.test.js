import { userInfoReducer, initialState } from './auth';
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailed,
  userLogoutAction,
  userDataRequest,
  userDataSuccess,
  userDataFailed,
  userDataUpdateRequest,
  userDataUpdateSuccess,
  userDataUpdateFailed,
  refreshAccessTokenRequest,
  refreshAccessTokenSuccess,
  refreshAccessTokenFailed,
} from '../../actions/auth/auth';

describe('userLoginRequest', () => {
  it('should set loginRequest to true', () => {
    const nextState = userInfoReducer(initialState, userLoginRequest());
    expect(nextState.loginRequest).toEqual(true);
  });
});

describe('userLoginSuccess', () => {
  it('should set loginRequest, loginRequestFailed, userDataLoaded, isAuthenticated, user, accessToken, refreshToken', () => {
    const payload = {
      accessToken: 'fakeAccessToken',
      refreshToken: 'fakeRefreshToken',
      success: true,
      user: {
        email: 'userBurger@yandex.ru',
        name: 'qwerty',
      },
    };
    const nextState = userInfoReducer(initialState, userLoginSuccess(payload));
    expect(nextState.loginRequest).toEqual(false);
    expect(nextState.loginRequestFailed).toEqual(false);
    expect(nextState.userDataLoaded).toEqual(true);
    expect(nextState.isAuthenticated).toEqual(true);
    expect(nextState.user).toEqual(payload.user);
    expect(nextState.accessToken).toEqual(payload.accessToken.split('Bearer ')[1]);
    expect(nextState.refreshToken).toEqual('fakeRefreshToken');
  });
});

describe('userLoginFailed', () => {
  it('should set loginRequestFailed to true', () => {
    const nextState = userInfoReducer(initialState, userLoginFailed());
    expect(nextState.loginRequestFailed).toEqual(true);
  });
});

describe('userLogoutAction', () => {
  it('should reset the state', () => {
    const nextState = userInfoReducer(initialState, userLogoutAction());
    expect(nextState.loginRequest).toEqual(false);
    expect(nextState.loginRequestFailed).toEqual(false);
    expect(nextState.userDataRequest).toEqual(false);
    expect(nextState.userDataRequestFailed).toEqual(false);
    expect(nextState.userDataUpdateRequest).toEqual(false);
    expect(nextState.userDataUpdateFailed).toEqual(false);
    expect(nextState.accessTokenRequest).toEqual(false);
    expect(nextState.accessTokenRequestFailed).toEqual(false);
    expect(nextState.isAuthenticated).toEqual(false);
    expect(nextState.user).toEqual({
      email: '',
      name: '',
    });
    expect(nextState.accessToken).toEqual('');
    expect(nextState.refreshToken).toEqual('');
  });
});

describe('userDataRequest', () => {
  it('should set userDataRequest to true', () => {
    const nextState = userInfoReducer(initialState, userDataRequest());
    expect(nextState.userDataRequest).toEqual(true);
  });
});

describe('userDataSuccess', () => {
  it('should set userDataRequest, userDataLoaded, isAuthenticated, user', () => {
    const payload = {
      accessToken: 'fakeAccessToken',
      refreshToken: 'fakeRefreshToken',
      success: true,
      user: {
        email: 'userBurger@yandex.ru',
        name: 'test',
      },
    };
    const nextState = userInfoReducer(initialState, userDataSuccess(payload));
    expect(nextState.userDataRequest).toEqual(false);
    expect(nextState.userDataLoaded).toEqual(true);
    expect(nextState.isAuthenticated).toEqual(true);
    expect(nextState.user).toEqual(payload.user);
  });
});

describe('userDataFailed', () => {
  it('should set userDataRequest to false', () => {
    const nextState = userInfoReducer(initialState, userDataFailed());
    expect(nextState.userDataRequest).toEqual(false);
  });
});

describe('userDataUpdateRequest', () => {
  it('should set userDataUpdateRequest to true', () => {
    const nextState = userInfoReducer(initialState, userDataUpdateRequest());
    expect(nextState.userDataUpdateRequest).toEqual(true);
  });
});

describe('userDataUpdateSuccess', () => {
  it('should set userDataUpdateRequest, userDataUpdateFailed, user', () => {
    const payload = {
      accessToken: 'fakeAccessToken',
      refreshToken: 'fakeRefreshToken',
      success: true,
      user: {
        email: 'userBurger@yandex.ru',
        name: 'qwerty',
      },
    };
    const nextState = userInfoReducer(initialState, userDataUpdateSuccess(payload));
    expect(nextState.userDataUpdateRequest).toEqual(false);
    expect(nextState.userDataUpdateFailed).toEqual(false);
    expect(nextState.user).toEqual(payload.user);
  });
});

describe('userDataUpdateFailed', () => {
  it('should set userDataRequest, userDataUpdateFailed to true', () => {
    const nextState = userInfoReducer(initialState, userDataUpdateFailed());
    expect(nextState.userDataRequest).toEqual(false);
    expect(nextState.userDataUpdateFailed).toEqual(true);
  });
});

describe('refreshAccessTokenRequest', () => {
  it('should set accessTokenRequest to true', () => {
    const nextState = userInfoReducer(initialState, refreshAccessTokenRequest());
    expect(nextState.accessTokenRequest).toEqual(true);
  });
});

describe('refreshAccessTokenSuccess', () => {
  it('should set accessTokenRequest, accessTokenRequestFailed, accessToken, refreshToken', () => {
    const payload = {
      accessToken: 'fakeAccessToken',
      refreshToken: 'fakeRefreshToken',
      success: true,
      user: {
        email: 'userBurger@yandex.ru',
        name: 'qwerty',
      },
    };
    const nextState = userInfoReducer(initialState, refreshAccessTokenSuccess(payload));
    expect(nextState.accessTokenRequest).toEqual(false);
    expect(nextState.accessTokenRequestFailed).toEqual(false);
    expect(nextState.accessToken).toEqual(payload.accessToken.split('Bearer ')[1]);
    expect(nextState.refreshToken).toEqual('fakeRefreshToken');
  });
});

describe('refreshAccessTokenFailed', () => {
  it('should set accessTokenRequestFailed to true', () => {
    const nextState = userInfoReducer(initialState, refreshAccessTokenFailed());
    expect(nextState.accessTokenRequestFailed).toEqual(true);
  });
});