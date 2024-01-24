import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui';
import { counterActions } from '../model/slice/counterSlice';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
export var Counter = function () {
    var dispatch = useDispatch();
    var counterValue = useSelector(getCounterValue);
    var inc = function () {
        dispatch(counterActions.incremented());
    };
    var dec = function () {
        dispatch(counterActions.decremented());
    };
    return (_jsxs("div", { children: [_jsx("h1", { "data-testid": 'value', children: counterValue }), _jsx(Button, { onClick: inc, "data-testid": 'inc', children: "inc" }), _jsx(Button, { onClick: dec, "data-testid": 'dec', children: "dec" })] }));
};
