import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'shared/config/i18n/i18n';
// eslint-disable-next-line react/display-name
export var TranslationDecorator = function (Story) { return (_jsx(I18nextProvider, { i18n: i18n, children: _jsx(Suspense, { fallback: '', children: _jsx(Story, {}) }) })); };
