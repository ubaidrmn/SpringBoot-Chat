import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name: "app",
    initialState: {
        isLoading: false,
        loadingEndMessage: null,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload.loading;
        },
        setLoadingEndMessage: (state, action) => {
            state.loadingEndMessage = action.payload.loadingEndMessage;
        }
    }
})

export const { setLoading, setLoadingEndMessage } = AppSlice.actions;

export default AppSlice.reducer;
