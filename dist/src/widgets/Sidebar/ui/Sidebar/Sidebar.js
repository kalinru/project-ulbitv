import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { memo, useState } from 'react';
import { Button, ButtonTheme, ThemeSwitcher } from 'shared/ui';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { ButtonSize } from 'shared/ui/Button/Button';
import { SidebaarItemsList } from 'widgets/Sidebar/model/items';
import { SidebarItem } from '../SidebarItem/SidebarItem';
export var Sidebar = memo(function (_a) {
    var _b;
    var className = _a.className;
    var _c = useState(false), collapsed = _c[0], setCollapsed = _c[1];
    var onToggle = function () {
        setCollapsed(function (value) { return !value; });
    };
    return (_jsxs("div", { className: classNames(cls.Sidebar, (_b = {}, _b[cls.collapsed] = collapsed, _b), [className]), "data-testid": 'sidebar', children: [_jsx(Button, { onClick: onToggle, theme: ButtonTheme.BACKGROUND_INVERTED, style: { color: 'white' }, className: cls.collapsedBtn, square: true, size: ButtonSize.L, "data-testid": 'sidebar-toggle', children: collapsed ? '>' : '<' }), _jsx("div", { className: cls.items, children: SidebaarItemsList.map(function (item) { return (_jsx(SidebarItem, { collapsed: collapsed, item: item }, item.path)); }) }), _jsxs("div", { className: cls.switchers, children: [_jsx(ThemeSwitcher, {}), _jsx(LangSwitcher, { short: collapsed })] })] }));
});
Sidebar.displayName = 'Sidebar';
