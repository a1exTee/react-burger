import formStyles from './Form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import {FC, ReactElement, FormEvent} from 'react'

export type TForm = {
  //name?: string;
  //email?: string;
  //password?: string;
  children?: JSX.Element|JSX.Element[],
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  title?: string;
  inputs?: {name: string; placeholder: string}[];
  buttonText?: string;
};

export const Form: FC<TForm> = ({ title, buttonText, onSubmit, children }: TForm) => {
  return (
    <>
      {title
      ? <h3 className={`text text_type_main-medium ${formStyles.title}`}>{title}</h3>
      : null
      }
      <form onSubmit={onSubmit} className={formStyles.form}>
        {children}
        {buttonText
        ? <Button htmlType='submit' size='medium' type='primary'>{buttonText}</Button>
        : null
        }
      </form>
    </>
  )
};