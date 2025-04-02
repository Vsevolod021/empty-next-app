'use server';

export async function validateForm(data) {
  const errors = [];

  Object.keys(data).forEach((field) => {
    if (data[field] === '') {
      errors.push({ field, message: 'Обязательное поле' });
    }
  });

  if (data.passwordRepeat) {
    if (data.password !== data.passwordRepeat) {
      errors.push({ field: 'passwordRepeat', message: 'Пароли не совпадают' });
    }
  }

  return errors;
}
