'use server';

export async function validateForm(data) {
  const errors = [];

  Object.keys(data).forEach((field) => {
    if (data[field] === '') {
      errors.push({ field, message: 'Обязательное поле' });
    }
  });

  return errors;
}
