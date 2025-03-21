import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    rules: {
      'init-declarations': ['warn', 'always'],
      'no-undef': 'error',
      'no-unused-vars': 'off',
      'jsx-quotes': ['error', 'prefer-double']
    }
  },
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          printWidth: 100,
          trailingComma: 'none',
          singleQuote: true,
          semi: true,
          endOfLine: 'auto'
        }
      ]
    }
  },
  prettierConfig
];

export default eslintConfig;
