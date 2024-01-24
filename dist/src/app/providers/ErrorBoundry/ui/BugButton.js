import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
export var BugButton = function (_a) {
    var className = _a.className;
    var _b = useState(false), error = _b[0], setError = _b[1];
    var t = useTranslation().t;
    var throwError = function () {
        setError(true);
    };
    useEffect(function () {
        if (error) {
            throw new Error();
        }
    }, [error]);
    return (_jsx(Button, { className: classNames('', {}, [className]), onClick: throwError, children: t('Выкинуть ошибку') }));
};
