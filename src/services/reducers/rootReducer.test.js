import { rootReducer } from './index';
import { createStore } from 'redux';

describe('Root Reducer', () => {
  it('should return the initial state', () => {
    const store = createStore(rootReducer);
    const expectedState = {
      burgerIngredientsReducer: {
        ingredients: null,
        ingredientsRequest: false,
        ingredientsChecker: false,
        selectedIngredient: null,
      },
      burgerConstructorReducer: {
        ingredientsConstructor: [],
        bun: null,
      },
      modalReducer: {
        isModalIngr: false,
        isModalOrder: false,
      },
      orderReducer: {
        order: undefined,
        orderRequest: false,
        orderError: false,
        name: '',
      },
      userInfoReducer: {
        loginRequest: false,
        loginRequestFailed: false,
        userDataLoaded: false,
        userDataRequest: false,
        userDataRequestFailed: false,
        userDataUpdateRequest: false,
        userDataUpdateFailed: false,
        accessTokenRequest: false,
        accessTokenRequestFailed: false,
        isAuthenticated: false,
        user: {
          email: "",
          name: "",
        },
        accessToken: "",
        refreshToken: "",
      },
      resetPasswordReducer: {
        emailRequest: false,
        emailRequestFailed: false,
        resetPasswordRequest: false,
        resetPasswordRequestFailed: false,
        verificationSent: false,
      },
      wsReducer: {
        wsConnected: false,
        orders: null,
        total: 0,
        totalToday: 0,
        wsError: undefined,
      },
      wsAuthReducer: {
        wsAuthConnected: false,
        orders: null,
        total: null,
        totalToday: null,
        wsAuthError: undefined,
      },
      currentOrderReducer: {
        information: null,
      },
    };
    
    expect(store.getState()).toEqual(expectedState);
  });
});