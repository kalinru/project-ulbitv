import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';
import { memo } from 'react';
export var Text = memo(function (props) {
    var className = props.className, _a = props.fontStyle, fontStyle = _a === void 0 ? '' : _a, children = props.children;
    var mods = {};
    return (_jsx("span", { className: classNames(cls.Text, mods, [className, cls[fontStyle]]), children: children }));
});
Text.displayName = 'Text';
