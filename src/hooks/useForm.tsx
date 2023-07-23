import { useState, ChangeEvent } from "react";

export type TFormValues = {
  name?: string;
  email: string;
  password?: string;
  code?: string;
  token?: string;
};

export function useForm(
  inputValues: TFormValues = {
    name: "",
    email: "",
    password: "",
    code: "",
    token: ''
  }) {
    const [values, setValues] = useState<TFormValues>(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, setValues, handleChange };
};

