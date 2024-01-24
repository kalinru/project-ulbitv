import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppRouter } from 'app/providers/router';
import useTheme from 'app/providers/ThemeProvider/lib/useTheme';
import { classNames } from 'shared/lib/classNames/classNames';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from 'entities/User';
var App = function () {
    var theme = useTheme().theme;
    var dispatch = useDispatch();
    useEffect(function () {
        dispatch(userActions.initAuthData());
    }, [dispatch]);
    return (_jsx("div", { className: classNames('app', {}, [theme]), children: _jsxs(Suspense, { fallback: '', children: [_jsx(Navbar, {}), _jsxs("div", { className: "content-page", children: [_jsx(Sidebar, {}), _jsx(AppRouter, {})] })] }) }));
};
export default App;
