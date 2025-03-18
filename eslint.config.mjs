import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      'eslint@next/next/no-img-element': 'off',
      'jsx-quotes': ['error', 'prefer-double'],
      'no-unused-vars': 'off',
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          trailingComma: 'none',
          singleQuote: true,
          endOfLine: 'auto',
          semi: true
        }
      ]
    }
  }
];

export default eslintConfig;
