import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
export var DynamicModuleLoader = function (props) {
    var children = props.children, reducers = props.reducers, removeAfterUnmouint = props.removeAfterUnmouint;
    var dispatch = useDispatch();
    var store = useStore();
    useEffect(function () {
        Object.entries(reducers).forEach(function (_a) {
            var name = _a[0], reducer = _a[1];
            store.reducerManager.add(name, reducer);
            dispatch({ type: "@INIT ".concat(name, " reducer") });
        });
        return function () {
            if (removeAfterUnmouint) {
                Object.entries(reducers).forEach(function (_a) {
                    var name = _a[0];
                    store.reducerManager.remove(name);
                    dispatch({ type: "@DESTROY ".concat(name, " reducer") });
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (_jsx(_Fragment, { children: children }));
};
