import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Modal.module.scss';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
var ANIMATION_TIME = 200;
export var Modal = function (props) {
    var _a;
    var children = props.children, className = props.className, _b = props.isOpen, isOpen = _b === void 0 ? false : _b, lazy = props.lazy, onClose = props.onClose;
    var _c = useState(false), isClosing = _c[0], setIsClosing = _c[1];
    var _d = useState(false), isMounted = _d[0], setIsMounted = _d[1];
    var timerRef = useRef();
    var mods = (_a = {},
        _a[cls.opened] = isOpen,
        _a[cls.isClosing] = isClosing,
        _a);
    var closeHandler = useCallback(function () {
        setIsClosing(true);
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (onClose) {
            timerRef.current = setTimeout(function () {
                onClose();
                setIsClosing(false);
            }, ANIMATION_TIME);
        }
    }, [onClose]);
    var onKeyDown = useCallback(function (e) {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);
    var onContentClick = function (event) {
        event.stopPropagation();
    };
    useEffect(function () {
        if (isOpen) {
            setIsMounted(true);
        }
    }, [isOpen]);
    useEffect(function () {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown);
        }
        return function () {
            clearTimeout(timerRef.current);
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [isOpen, onKeyDown]);
    if (lazy && !isMounted) {
        return null;
    }
    return (_jsx(Portal, { children: _jsx("div", { className: classNames(cls.Modal, mods, [className]), children: _jsx("div", { className: cls.overlay, onClick: closeHandler, children: _jsx("div", { className: cls.content, onClick: onContentClick, children: children }) }) }) }));
};
