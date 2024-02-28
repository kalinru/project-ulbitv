module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        "plugin:i18next/recommended",
        "plugin:react-hooks/recommended",
        // "plugin:storybook/recommended", ??? 112 Исправляем проблемы с зависимостями. Обновляем сторибук
        // "plugin:import/recommended",
        // "plugin:import/typescript",
        "plugin:prettier/recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        },
        {
            files: ["**/src/**/*.{test,stories}.{ts,tsx}"],
            rules: {
                "i18next/no-literal-string": "off",
                "max-len": "off",
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "i18next",
        "jsx-a11y",
        // "react-hooks",
        "ulbi-tv-plugin-kalinru",
        "unused-imports",
        "import"
    ],
    "rules": {
        "react/jsx-indent": [2, 2],
        "max-len": ['error', { ignoreComments: true, code: 120 }],
        // 'react/jsx-indent-props': [2, 4],
        // indent: [2, 4],
        // 'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
        // 'import/no-unresolved': 'off',
        // 'import/prefer-default-export': 'off',
        // 'no-unused-vars': 'warn',
        // 'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        // 'react/jsx-props-no-spreading': 'warn',
        // 'react/function-component-definition': 'off',
        // 'no-shadow': 'off',
        // 'import/extensions': 'off',
        // 'import/no-extraneous-dependencies': 'off',
        // 'no-underscore-dangle': 'off',
        "i18next/no-literal-string": [
            'error', 
            {
                markupOnly: true,
                ignoreAttribute: [
                    'data-testid',
                    'to',
                    'target',
                    'className',
                    'justify',
                    'align',
                    'direction',
                    'gap',
                    'role',
                    'as',
                    'element',
                    'border',
                ]
            }
        ],
        "@typescript-eslint/explicit-function-return-type": [
            "warn",
            { "allowExpressions": true } 
        ]
        ,
        "@typescript-eslint/consistent-type-assertions": [
            "warn",
        ],
        "jsx-a11y/no-static-element-interactions": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "@typescript-eslint/strict-boolean-expressions": "off",
        "react/prop-types": "off",
        "no-undef": "off",
        "n/no-callback-literal": "off",
        "unused-imports/no-unused-imports": "error",
        "import/order": [
            "error",
            {
                "groups": [
                    "builtin", "external", "internal", "parent", "sibling", "index", "object", "type"
                ],
                "pathGroups": [
                    {
                        "pattern": "@/**",
                        "group": "internal",
                        "position": "after"
                    },
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                ],
                "pathGroupsExcludedImportTypes": ["react"],
                alphabetize: {
                    order: 'asc', /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */
                    caseInsensitive: true /* ignore case. Options: [true, false] */
                },
                "newlines-between": "always",
            }
        ],
        "ulbi-tv-plugin-kalinru/path-checker": [
            "error", {
                alias: '@'
            }
        ],
        "ulbi-tv-plugin-kalinru/fsd-public-api-imports": [
            "error", 
            {
                alias: '@',
                testFilesPatterns: [
                    '**/*.test.*',
                    '**/*.stories.*',
                    '**/StoreDecorator.tsx',
                ],
            }
        ],
        "ulbi-tv-plugin-kalinru/fsd-layer-imports": [
            "error", 
            {
                alias: '@',
                ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
            }
        ],
        "@typescript-eslint/method-signature-style": "off"
        // "@typescript-eslint/no-non-null-assertion": "off"
    },
    "globals": {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true
    },
}
