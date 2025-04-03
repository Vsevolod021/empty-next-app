'use client';

import React, { useState } from 'react';

/* 
  Form
*/
const Form = ({ formTemplate, action, onSubmitSuccess, className = '', children }) => {
  const [form, setForm] = useState(formTemplate);
  const [errors, setErrors] = useState([]);

  const formError = errors.find((error) => error.field === 'form')?.message;

  const inputError = (field) => errors.find((error) => error.field === field);

  const onFormChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors([]);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const errors = await action(form);
    setErrors(errors);

    if (errors.length === 0) {
      setForm(formTemplate);

      await onSubmitSuccess();
    }
  };

  return (
    <form className={`form ${className}`} onSubmit={onSubmit}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { onFormChange, inputError, formError, form })
      )}
    </form>
  );
};

/* 
  Input
*/
Form.Input = ({
  className = '',
  type = 'text',
  onFormChange,
  placeholder,
  inputError,
  form,
  name
}) => {
  const error = inputError(name)?.message;

  return (
    <div className={`form-input ${className}`}>
      <input
        className="form-input__input"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => onFormChange(e.target.name, e.target.value)}
        value={form[name]}
      />
      <p className={`form-input__error ${error ? 'form-input__error--active' : ''}`}>
        {error ?? ''}
      </p>
    </div>
  );
};

/* 
  Submit
*/
Form.Submit = ({ className = '', formError, children }) => (
  <div className={`form-submit ${className}`}>
    <div className={`form-submit__error ${formError ? 'form-submit__error--active' : ''}`}>
      {formError ?? ''}
    </div>
    <button className="form-submit__button" type="submit">
      {children}
    </button>
  </div>
);

Form.Submit.displayName = 'FormSubmit';
Form.Input.displayName = 'FormInput';

export default Form;
