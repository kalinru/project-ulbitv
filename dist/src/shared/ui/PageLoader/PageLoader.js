import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './PageLoader.module.scss';
import { Loader } from 'shared/ui';
export var PageLoader = function (_a) {
    var className = _a.className;
    return (_jsx("div", { className: classNames(cls.PageLoader, {}, [className]), children: _jsx(Loader, {}) }));
};
