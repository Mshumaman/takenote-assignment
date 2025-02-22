import playwright from 'eslint-plugin-playwright'

export default [
    {
        ...playwright.configs['flat/recommended'],
        files: ['tests/**/*.ts'],
        rules: {
            ...playwright.configs['flat/recommended'].rules,
            'playwright/no-focused-test': 'error',
            'playwright/expect-expect': 'off',  // Turn off the expect-expect rule
            'playwright/valid-title': ['error', { disallowedWords: [] }],  // Adjust as needed
        },
    },
]
