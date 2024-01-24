import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
export var Navbar = memo(function (_a) {
    var className = _a.className;
    var _b = useState(false), isAuthModalOpened = _b[0], setIsAuthModalOpened = _b[1];
    var t = useTranslation().t;
    var authData = useSelector(getUserAuthData);
    var dispatch = useDispatch();
    var onCloseModal = useCallback(function () {
        setIsAuthModalOpened(false);
    }, []);
    var onOpenModal = useCallback(function () {
        setIsAuthModalOpened(true);
    }, []);
    var onLogout = useCallback(function () {
        dispatch(userActions.logout());
    }, [dispatch]);
    if (authData) {
        return (_jsx("div", { className: classNames(cls.Navbar, {}, [className]), children: _jsx(Button, { className: cls.links, theme: ButtonTheme.OUTLINE, onClick: onLogout, children: t('Выйти') }) }));
    }
    return (_jsxs("div", { className: classNames(cls.Navbar, {}, [className]), children: [_jsx(Button, { className: cls.links, theme: ButtonTheme.OUTLINE, onClick: onOpenModal, children: t('Войти') }), isAuthModalOpened &&
                _jsx(LoginModal, { isOpen: isAuthModalOpened, onClose: onCloseModal })] }));
});
Navbar.displayName = 'Navbar';
