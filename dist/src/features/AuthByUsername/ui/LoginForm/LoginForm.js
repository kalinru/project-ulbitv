var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { Button, ButtonTheme } from 'shared/ui';
import { Input } from 'shared/ui/CarriageInput/Input';
import { memo, useCallback } from 'react';
import { loginActions, loginReducer } from '../..//model/slice/loginSlice';
import { useAppSelector } from 'app/providers/StoreProvider/config/store';
import { loginByUsername } from '../../services/loginByUsername/loginByUsername';
import { Text } from 'shared/ui/Text/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
var initialReducers = {
    loginForm: loginReducer
};
var LoginForm = memo(function (_a) {
    var className = _a.className, onSuccess = _a.onSuccess;
    var t = useTranslation().t;
    var dispatch = useAppDispatch();
    var username = useAppSelector(getLoginUsername);
    var password = useAppSelector(getLoginPassword);
    var isLoading = useAppSelector(getLoginIsLoading);
    var error = useAppSelector(getLoginError);
    var onChangeUsername = useCallback(function (value) {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    var onChangePassword = useCallback(function (value) {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);
    var onLoginClick = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dispatch(loginByUsername({
                        username: username,
                        password: password
                    }))];
                case 1:
                    result = _a.sent();
                    if (result.meta.requestStatus === 'fulfilled') {
                        onSuccess === null || onSuccess === void 0 ? void 0 : onSuccess();
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [dispatch, onSuccess, password, username]);
    return (_jsx(DynamicModuleLoader, { reducers: initialReducers, children: _jsxs("div", { className: classNames(cls.LoginForm, {}, [className]), children: [_jsx("h1", { children: t('Авторизация') }), !!error &&
                    _jsx("div", { children: _jsx(Text, { fontStyle: 'danger', children: t('Пользователь не найден или Вы ввели неверный логиг или пароль') }) }), _jsx(Input, { type: "text", placeholder: t('Логин'), value: username, onChange: onChangeUsername, autofocus: true }), _jsx(Input, { type: "text", placeholder: t('Пароль'), value: password, onChange: onChangePassword, autofocus: true }), _jsx("div", { children: _jsx(Button, { theme: ButtonTheme.OUTLINE, disabled: isLoading, onClick: onLoginClick, children: t('Войти') }) })] }) }));
});
LoginForm.displayName = 'LoginForm';
export default LoginForm;
