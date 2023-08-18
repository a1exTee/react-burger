import { resetPasswordReducer, initialState } from './reset-password';
import {
  verificationEmailRequest,
  verificationEmailSuccess,
  verificationEmailFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
} from '../../actions/auth/reset-password';

describe('Reset Password Reducer', () => {
  it('should return the initial state', () => {
    expect(resetPasswordReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle VERIFICATION_EMAIL_REQUEST', () => {
    const action = verificationEmailRequest();

    const expectedState = {
      ...initialState,
      emailRequest: true,
    };

    expect(resetPasswordReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle VERIFICATION_EMAIL_SUCCESS', () => {
    const verificationSent = true;
    const action = verificationEmailSuccess(verificationSent);

    const expectedState = {
      ...initialState,
      emailRequest: false,
      verificationSent,
      emailRequestFailed: false,
    };

    expect(resetPasswordReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle VERIFICATION_EMAIL_FAILED', () => {
    const action = verificationEmailFailed();

    const expectedState = {
      ...initialState,
      emailRequest: false,
      emailRequestFailed: true,
    };

    expect(resetPasswordReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PASSWORD_REQUEST', () => {
    const action = resetPasswordRequest();

    const expectedState = {
      ...initialState,
      resetPasswordRequest: true,
    };

    expect(resetPasswordReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PASSWORD_SUCCESS', () => {
    const action = resetPasswordSuccess();

    const expectedState = {
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordRequestFailed: false,
    };

    expect(resetPasswordReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle RESET_PASSWORD_FAILED', () => {
    const action = resetPasswordFailed();

    const expectedState = {
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordRequestFailed: true,
    };

    expect(resetPasswordReducer(initialState, action)).toEqual(expectedState);
  });
});