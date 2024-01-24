import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePage.module.scss';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ProfileCard, fetchProfileData, profileReducer } from 'entities/Profile';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
var reducers = {
    profile: profileReducer
};
var ProfilePage = function (_a) {
    var className = _a.className;
    var t = useTranslation().t;
    var dispatch = useAppDispatch();
    useEffect(function () {
        void dispatch(fetchProfileData());
    }, [dispatch]);
    return (_jsx(DynamicModuleLoader, { reducers: reducers, removeAfterUnmouint: true, children: _jsx("div", { className: classNames(cls.ProfilePage, {}, [className]), children: _jsx(ProfileCard, {}) }) }));
};
export default ProfilePage;
