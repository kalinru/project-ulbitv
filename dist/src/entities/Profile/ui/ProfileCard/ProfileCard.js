import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'app/providers/StoreProvider/config/store';
import { classNames } from 'shared/lib/classNames/classNames';
import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import cls from './ProfileCard.module.scss';
import { Button, ButtonTheme } from 'shared/ui';
import { Input } from 'shared/ui/Input/Input';
export var ProfileCard = function (_a) {
    var className = _a.className;
    var t = useTranslation('profile').t;
    var data = useAppSelector(getProfileData);
    var error = useAppSelector(getProfileError);
    var isLoading = useAppSelector(getProfileIsLoading);
    return (_jsxs("div", { className: classNames(cls.ProfileCard, {}, [className]), children: [_jsxs("div", { className: cls.header, children: [_jsx("h1", { children: t('Профиль') }), _jsx(Button, { theme: ButtonTheme.OUTLINE, className: cls.editBtn, children: t('Редактировать') })] }), _jsxs("div", { className: cls.data, children: [_jsx(Input, { value: data === null || data === void 0 ? void 0 : data.first, placeholder: t('Ваше имя'), className: cls.input }), _jsx(Input, { value: data === null || data === void 0 ? void 0 : data.lastname, placeholder: t('Ваша фамилия'), className: cls.input })] })] }));
};
