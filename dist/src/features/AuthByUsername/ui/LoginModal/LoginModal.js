import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginModal.module.scss';
import { Modal } from 'shared/ui/Modal/Modal';
import { Suspense, useEffect } from 'react';
import { LoginFormAsync } from '../LoginForm/LoginForm.async';
import { Loader } from 'shared/ui';
export var LoginModal = function (_a) {
    var className = _a.className, isOpen = _a.isOpen, onClose = _a.onClose;
    useEffect(function () {
        return function () {
            onClose === null || onClose === void 0 ? void 0 : onClose();
        };
    }, [onClose]);
    return (_jsx(Modal, { className: classNames(cls.LoginModal, {}, [className]), lazy: true, isOpen: isOpen, onClose: onClose, children: _jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsx(LoginFormAsync, { onSuccess: onClose }) }) }));
};
