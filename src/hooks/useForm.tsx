import React, { useState } from 'react';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { AppDispatch, AppThunk } from '../utils/prop-types';
import { RootState } from '../services/reducers';


export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

type AppDispatchFunc = () => AppDispatch | AppThunk;
export const useDispatch: AppDispatchFunc = dispatchHook;


export function useForm(inputValues: any) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
}
