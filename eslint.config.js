import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
     'jsx-a11y/anchor-is-valid': 'off',
     'jsx-a11y/img-redundant-alt': 'off'rules: {
     ...Object.fromEntries(
     Object.keys(reactHooks.rules ?? {})
      .filter(r => r.startsWith('jsx-a11y/'))
      .map(r => [r, 'off'])
  ),
  'jsx-a11y/anchor-is-valid': 'off',
  'jsx-a11y/img-redundant-alt': 'off',
},
  },
])
