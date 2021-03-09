module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'quotes': ['warn', 'single'],
    '@typescript-eslint/indent' : ['error', 2],
    '@typescript-eslint/no-use-before-define' : 'off',
    '@typescript-eslint/no-explicit-any' : 'off',
    'semi' : 'off',
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/no-empty-function': 'off',
    'camelcase': 'off',
    'no-unused-vars': 'off',
    'object-curly-spacing':['warn', 'always'],
    'object-property-newline': ["error", { "allowAllPropertiesOnSameLine": true }]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        mocha: true
      }
    }
  ]
}
