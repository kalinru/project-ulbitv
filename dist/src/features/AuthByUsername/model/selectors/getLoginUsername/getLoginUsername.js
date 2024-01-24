import { getLoginState } from '../getLoginState/getLoginState';
export var getLoginUsername = function (state) { var _a, _b; return (_b = (_a = getLoginState(state)) === null || _a === void 0 ? void 0 : _a.username) !== null && _b !== void 0 ? _b : ''; };
