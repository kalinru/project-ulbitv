import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './NotFoundPage.module.scss';
import { useTranslation } from 'react-i18next';
export var NotFoundPage = function (_a) {
    var className = _a.className;
    var t = useTranslation().t;
    return (_jsx("div", { className: classNames(cls.NotFoundPage, {}, [className]), children: t('Страница не найдена') }));
};
