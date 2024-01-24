import { jsx as _jsx } from "react/jsx-runtime";
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'shared/config/i18n/i18nForTests';
export function renderWithTranslation(component) {
    return render(_jsx(I18nextProvider, { i18n: i18n, children: component }));
}
