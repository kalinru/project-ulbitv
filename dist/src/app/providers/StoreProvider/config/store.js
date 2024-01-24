var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { configureStore } from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { useSelector } from 'react-redux';
import { createReducerManager } from './reducerManager';
import { $api } from 'shared/api/api';
export function createReduxStore(initialState, asyncReducers, navigate) {
    var reducer = __assign(__assign({}, asyncReducers), { counter: counterReducer, user: userReducer });
    var reducerManager = createReducerManager(reducer);
    var extraArgument = {
        api: $api,
        navigate: navigate
    };
    var store = configureStore({
        reducer: reducerManager.reduce,
        preloadedState: initialState,
        devTools: __IS_DEV__,
        middleware: function (getDefaultMiddleware) { return getDefaultMiddleware({
            thunk: {
                extraArgument: extraArgument
            }
        }); }
    });
    // @ts-expect-error fixme
    store.reducerManager = reducerManager;
    return store;
}
export var useAppSelector = useSelector;
