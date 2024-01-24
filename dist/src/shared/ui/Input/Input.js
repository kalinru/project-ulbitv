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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Input.module.scss';
import { memo } from 'react';
export var Input = memo(function (props) {
    var className = props.className, value = props.value, onChange = props.onChange, _a = props.type, type = _a === void 0 ? 'text' : _a, label = props.label, restProps = __rest(props, ["className", "value", "onChange", "type", "label"]);
    var onChangeHandler = function (e) {
        onChange === null || onChange === void 0 ? void 0 : onChange(e.target.value);
    };
    return (_jsxs("div", { className: classNames(cls.Input, {}, [className]), children: [!!label &&
                _jsx("div", { className: cls.label, children: label }), _jsx("input", __assign({ value: value, onChange: onChangeHandler, type: type, className: cls.input }, restProps))] }));
});
Input.displayName = 'Input';
