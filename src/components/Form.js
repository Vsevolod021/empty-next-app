import React, { useState } from 'react';

// form
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

// Input
Form.Input = ({
  className = '',
  type = 'text',
  onFormChange,
  placeholder,
  inputError,
  form,
  name
}) => (
  <div className={`input ${className}`}>
    <input
      className="input__input"
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={(e) => onFormChange(e.target.name, e.target.value)}
      value={form[name]}
    />
    <p className="input__error">{inputError(name)?.message ?? ''}</p>
  </div>
);

// Submit
Form.Submit = ({ className = '', formError, children }) => {
  return (
    <div className={`form-submit ${className}`}>
      <div className="form-submit__error">{formError ?? ''}</div>
      <button className="form-submit__button" type="submit">
        {children}
      </button>
    </div>
  );
};

Form.Submit.displayName = 'FormSubmit';
Form.Input.displayName = 'FormInput';

export default Form;
