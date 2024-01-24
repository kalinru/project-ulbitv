import { createSlice } from '@reduxjs/toolkit';
var initialState = {
    value: 0
};
export var counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        incremented: function (state) {
            state.value += 1;
        },
        decremented: function (state) {
            state.value -= 1;
        }
    }
});
export var counterActions = counterSlice.actions;
export var counterReducer = counterSlice.reducer;
