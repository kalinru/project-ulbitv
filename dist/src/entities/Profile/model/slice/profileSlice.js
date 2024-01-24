import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
var initialState = {
    isLoading: false,
    readonly: true,
    data: undefined,
    error: undefined
};
export var profileSlice = createSlice({
    name: 'profile',
    initialState: initialState,
    reducers: {},
    extraReducers: function (builder) {
        builder
            .addCase(fetchProfileData.pending, function (state) {
            state.error = undefined;
            state.isLoading = true;
        })
            .addCase(fetchProfileData.fulfilled, function (state, action) {
            state.isLoading = false;
            state.data = action.payload;
        })
            .addCase(fetchProfileData.rejected, function (state, action) {
            state.error = action.payload;
            state.isLoading = false;
        });
    }
});
export var profileActions = profileSlice.actions;
export var profileReducer = profileSlice.reducer;
