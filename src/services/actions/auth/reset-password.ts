import { postForgotPassword, postResetPassword } from "../../../utils/data";
import { AppDispatch, AppThunk } from '../../../utils/prop-types';

export const VERIFICATION_EMAIL_REQUEST: 'VERIFICATION_EMAIL_REQUEST' = 'VERIFICATION_EMAIL_REQUEST';
export const VERIFICATION_EMAIL_SUCCESS: 'VERIFICATION_EMAIL_SUCCESS' = 'VERIFICATION_EMAIL_SUCCESS';
export const VERIFICATION_EMAIL_FAILED: 'VERIFICATION_EMAIL_FAILED' = 'VERIFICATION_EMAIL_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';


export interface IVerificationEmailRequest {
  readonly type: typeof VERIFICATION_EMAIL_REQUEST;

}
export interface IVerificationEmailSuccess {
  readonly type: typeof VERIFICATION_EMAIL_SUCCESS;
  payload: {success:true, message:'Reset email sent'}
}
export interface IVerificationEmailFailed {
  readonly type: typeof VERIFICATION_EMAIL_FAILED;
}
//-------------------------------------------------------------------
export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST;
}
export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;

}
export interface IResetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
}


export type TResetPasswordActions = 
  | IVerificationEmailRequest
  | IVerificationEmailSuccess
  | IVerificationEmailFailed
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordFailed
  ;


export const verificationEmailRequest = (): IVerificationEmailRequest => ({
  type: VERIFICATION_EMAIL_REQUEST,
});
export const verificationEmailSuccess = (payload: {success:true, message:'Reset email sent'}): IVerificationEmailSuccess => ({
  type: VERIFICATION_EMAIL_SUCCESS,
  payload
});
export const verificationEmailFailed = (): IVerificationEmailFailed => ({
  type: VERIFICATION_EMAIL_FAILED,
});
//------------------------------------------------------------
export const resetPasswordRequest = (): IResetPasswordRequest => ({
  type: RESET_PASSWORD_REQUEST,
});
export const resetPasswordSuccess = (): IResetPasswordSuccess => ({
  type: RESET_PASSWORD_SUCCESS,
});
export const resetPasswordFailed = (): IResetPasswordFailed => ({
  type: RESET_PASSWORD_FAILED,
});



export const sentVerificationEmail: AppThunk = (email: string, goToPage: ()=>void) => {
  return function (dispatch: AppDispatch) {
    dispatch(verificationEmailRequest());
    postForgotPassword(email)
      .then(res => {
        if (res && res.success) {
          dispatch(verificationEmailSuccess(res))
        }
      })
      .then(goToPage)
      .catch(e => {
        dispatch(verificationEmailFailed());
      })
  }
}

export function resetPassword(password: string, token: string) {
  return function (dispatch: AppDispatch) {
    dispatch(resetPasswordRequest());
    postResetPassword(password, token).then(res => {
      if (res && res.success) {
        dispatch(resetPasswordSuccess());
      }
    }).catch(e => {
      dispatch(resetPasswordFailed());
    })
  }
}