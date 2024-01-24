var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { jsx as _jsx } from "react/jsx-runtime";
import { Component, Suspense } from 'react';
import { Loader } from 'shared/ui';
import { PageError } from 'widgets/PageError/ui/PageError';
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { hasError: false };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (_error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    };
    ErrorBoundary.prototype.render = function () {
        var hasError = this.state.hasError;
        var children = this.props.children;
        if (hasError) {
            // You can render any custom fallback UI
            return (_jsx(Suspense, { fallback: _jsx(Loader, {}), children: _jsx(PageError, {}) }));
        }
        return children;
    };
    return ErrorBoundary;
}(Component));
export default ErrorBoundary;
