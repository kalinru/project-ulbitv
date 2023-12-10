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
        "plugin:react-hooks/recommended"
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
        "jsx-a11y"
    ],
    "rules": {
        "react/jsx-indent": [2, 2],
        "max-len": ['error', { ignoreComments: true, code: 100 }],
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
        "react-hooks/exhaustive-deps": "error"
    },
    "globals": {
        __IS_DEV__: true
    },
}
