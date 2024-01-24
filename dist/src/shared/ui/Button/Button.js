var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';
export var ButtonTheme;
(function (ButtonTheme) {
    ButtonTheme["CLEAR"] = "clear";
    ButtonTheme["OUTLINE"] = "outline";
    ButtonTheme["BACKGROUND"] = "background";
    ButtonTheme["BACKGROUND_INVERTED"] = "backgroundInverted";
})(ButtonTheme || (ButtonTheme = {}));
export var ButtonSize;
(function (ButtonSize) {
    ButtonSize["M"] = "size_m";
    ButtonSize["L"] = "size_l";
    ButtonSize["XL"] = "size_xl";
})(ButtonSize || (ButtonSize = {}));
export var Button = memo(function (props) {
    var _a;
    var children = props.children, className = props.className, _b = props.theme, theme = _b === void 0 ? ButtonTheme.CLEAR : _b, _c = props.square, square = _c === void 0 ? false : _c, _d = props.size, size = _d === void 0 ? ButtonSize.M : _d, _e = props.disabled, disabled = _e === void 0 ? false : _e, restProps = __rest(props, ["children", "className", "theme", "square", "size", "disabled"]);
    var mods = (_a = {},
        _a[cls.square] = square,
        _a[cls.disabled] = disabled,
        _a);
    return (_jsx("button", __assign({ disabled: disabled, className: classNames(cls.Button, mods, [className, cls[theme], cls[size]]) }, restProps, { children: children })));
});
Button.displayName = 'Button';
