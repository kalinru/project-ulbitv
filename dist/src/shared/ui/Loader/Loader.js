import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import './Loader.scss';
export var Loader = function (_a) {
    var className = _a.className;
    return (_jsxs("div", { className: classNames('lds-ripple', {}, [className]), children: [_jsx("div", {}), _jsx("div", {})] }));
};
