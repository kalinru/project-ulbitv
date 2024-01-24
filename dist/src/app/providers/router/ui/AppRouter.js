import { jsx as _jsx } from "react/jsx-runtime";
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routerConfig/routerConfig';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
var AppRouter = function () {
    return (_jsx(Routes, { children: Object.values(routeConfig).map(function (_a) {
            var path = _a.path, element = _a.element;
            return (_jsx(Route, { path: path, element: _jsx(Suspense, { fallback: _jsx(PageLoader, {}), children: _jsx("div", { className: "page-wrapper", children: element }) }) }, path));
        }) }));
};
export default AppRouter;
