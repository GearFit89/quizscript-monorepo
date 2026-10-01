import neostandard from 'neostandard'
import unusedImports from 'eslint-plugin-unused-imports'
import reactHooks from 'eslint-plugin-react-hooks'
import hono from 'eslint-plugin-hono'


export default neostandard({
  ts: true,
  plugins: {
    'unused-imports': unusedImports,
    'react-hooks': reactHooks,
    'hono': hono,
    'xstate': xstate
  },
  rules: {
    //  Auto-remove unused imports on `eslint --fix`
    '@typescript-eslint/no-unused-vars': 'off', // Turn off standard rule to prevent duplicate reports
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],

    // React Hooks rules
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    
    ...hono.configs.recommended.rules

    
    
  }
})