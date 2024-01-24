import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import { Button, ButtonTheme } from 'shared/ui';
export var ThemeSwitcher = memo(function (props) {
    var className = props.className;
    var _a = useTheme(), theme = _a.theme, toggleTheme = _a.toggleTheme;
    return (_jsx(Button, { theme: ButtonTheme.CLEAR, onClick: toggleTheme, className: classNames('', {}, [className]), children: theme === Theme.LIGHT ? _jsx(LightIcon, {}) : _jsx(DarkIcon, {}) }));
});
ThemeSwitcher.displayName = 'ThemeSwitcher';
