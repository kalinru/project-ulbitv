import { useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext';
var useTheme = function () {
    var _a = useContext(ThemeContext), theme = _a.theme, setTheme = _a.setTheme;
    var toggleTheme = function () {
        var newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
        setTheme === null || setTheme === void 0 ? void 0 : setTheme(newTheme);
    };
    return {
        theme: theme !== null && theme !== void 0 ? theme : Theme.LIGHT,
        toggleTheme: toggleTheme
    };
};
export default useTheme;
