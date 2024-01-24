var _a;
import axios from 'axios';
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localStorage';
export var $api = axios.create({
    baseURL: __API__,
    headers: {
        // FIXME после разлогинивания все равно отправляется заголовок (из localStorage удаляется)
        authorization: (_a = localStorage.getItem(USER_LOCAL_STORAGE_KEY)) !== null && _a !== void 0 ? _a : ''
    }
});
