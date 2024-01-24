import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import cls from './SidebarItem.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
export var SidebarItem = memo(function (_a) {
    var _b;
    var item = _a.item, collapsed = _a.collapsed;
    var Icon = item.Icon, path = item.path, text = item.text;
    var t = useTranslation().t;
    return (_jsxs(AppLink, { to: path, theme: AppLinkTheme.SECONDARY, className: classNames(cls.item, (_b = {}, _b[cls.collapsed] = collapsed, _b)), children: [_jsx(Icon, { className: cls.icon }), _jsx("span", { className: cls.link, children: t(text) })] }));
});
SidebarItem.displayName = 'SidebarItem';
