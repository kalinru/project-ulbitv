import { getLoginState } from '../getLoginState/getLoginState';
export var getLoginError = function (state) { var _a; return (_a = getLoginState(state)) === null || _a === void 0 ? void 0 : _a.error; };
