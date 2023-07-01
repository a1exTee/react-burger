import formStyles from './Form.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useState } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, setValues, handleChange };
};

export function Form({ title, buttonText, onSubmit, children }) {
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

Form.propTypes = {
  title: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired
};