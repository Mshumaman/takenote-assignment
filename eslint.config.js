import playwright from 'eslint-plugin-playwright'

export default [
    {
        ...playwright.configs['flat/recommended'],
        files: ['tests/**/*.ts'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            'playwright/no-focused-test': 'error',
            'playwright/expect-expect': 'off',
            'playwright/valid-title': ['error', { disallowedWords: [] }],
        },
    },
]
