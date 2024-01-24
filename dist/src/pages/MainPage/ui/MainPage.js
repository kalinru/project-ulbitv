import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BugButton } from 'app/providers/ErrorBoundry';
import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';
var MainPage = function () {
    var t = useTranslation().t;
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: t('Главная') }), _jsx("div", { children: _jsx(Counter, {}) }), _jsx("div", { children: _jsx(BugButton, {}) })] }));
};
export default MainPage;
