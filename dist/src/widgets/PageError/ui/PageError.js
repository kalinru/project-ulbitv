import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageError.module.scss';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui';
export var PageError = function (_a) {
    var className = _a.className;
    var t = useTranslation().t;
    var reloadPage = function () {
        location.reload();
    };
    return (_jsxs("div", { className: classNames(cls.PageError, {}, [className]), children: [_jsx("p", { children: t('Что-то пошло не так') }), _jsx(Button, { onClick: reloadPage, children: t('Обновить страницу') })] }));
};
