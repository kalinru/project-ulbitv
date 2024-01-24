import { createSlice } from '@reduxjs/toolkit';
import { USER_LOCAL_STORAGE_KEY } from 'shared/consts/localStorage';
var initialState = {};
export var counterSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUserData: function (state, action) {
            state.authData = action.payload;
        },
        initAuthData: function (state) {
            var user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
            if (user) {
                state.authData = JSON.parse(user);
            }
        },
        logout: function (state) {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
        }
    }
});
export var userActions = counterSlice.actions;
export var userReducer = counterSlice.reducer;
