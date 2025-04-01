'use client';

const Input = ({
  name,
  placeholder,
  onChange,
  value,
  type = 'text',
  error = {},
  className = ''
}) => {
  return (
    <div className={`input ${className}`}>
      <input
        className="input__input"
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <p className="input__error">{error?.message ?? ''}</p>
    </div>
  );
};

export default Input;
