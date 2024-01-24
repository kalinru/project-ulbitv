var _a;
import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';
var defaultTheme = (_a = localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) !== null && _a !== void 0 ? _a : Theme.LIGHT;
var ThemeProvider = function (_a) {
    var children = _a.children, initialTheme = _a.initialTheme;
    var _b = useState(initialTheme !== null && initialTheme !== void 0 ? initialTheme : defaultTheme), theme = _b[0], setTheme = _b[1];
    var defaultProps = useMemo(function () { return ({
        theme: theme,
        setTheme: setTheme
    }); }, [theme]);
    useEffect(function () {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);
    return (_jsx(ThemeContext.Provider, { value: defaultProps, children: children }));
};
export default ThemeProvider;
