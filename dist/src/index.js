import { jsx as _jsx } from "react/jsx-runtime";
// eslint-disable-next-line react/no-deprecated
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';
import { ThemeProvider } from 'app/providers/ThemeProvider';
import { ErrorBoundary } from 'app/providers/ErrorBoundry';
import App from 'app/App';
import 'shared/config/i18n/i18n';
import 'app/styles/index.scss';
render(_jsx(BrowserRouter, { children: _jsx(StoreProvider, { children: _jsx(ErrorBoundary, { children: _jsx(ThemeProvider, { children: _jsx(App, {}) }) }) }) }), document.getElementById('root'));
