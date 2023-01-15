import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name: "app",
    initialState: {
        isLoading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload.loading;
        }
    }
})

export const { setLoading } = AppSlice.actions;

export default AppSlice.reducer;
