import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config({
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ['**/*.{ts,tsx,jsx,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    'jsx-quotes': ["error", "prefer-single"],
    '@typescript-eslint/no-unused-vars': 'warn',
    'quotes': ['warn', 'single', { "allowTemplateLiterals": true }],
    'semi': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-unused-expressions": "off",
    "react-hooks/rules-of-hooks": "off",
  },
})