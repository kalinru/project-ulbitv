import { getLoginState } from '../getLoginState/getLoginState';
export var getLoginIsLoading = function (state) { var _a, _b; return (_b = (_a = getLoginState(state)) === null || _a === void 0 ? void 0 : _a.isLoading) !== null && _b !== void 0 ? _b : false; };
