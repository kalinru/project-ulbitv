import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider } from 'app/providers/ThemeProvider';
// eslint-disable-next-line react/display-name
export var ThemeDecorator = function (theme) { return function (Story) { return (_jsx(ThemeProvider, { initialTheme: theme, children: _jsx("div", { className: "app ".concat(theme), children: _jsx(Story, {}) }) })); }; };
