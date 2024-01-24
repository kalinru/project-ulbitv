import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';
var AboutPage = function () {
    var t = useTranslation().t;
    return (_jsxs(_Fragment, { children: [_jsx("div", { children: t('О сайте') }), _jsx("div", { children: _jsx(Counter, {}) })] }));
};
export default AboutPage;
