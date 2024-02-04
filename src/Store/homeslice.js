import { createSlice } from "@reduxjs/toolkit";


const homeSlice = createSlice({
    name: "home",
    initialState: { url: {}, genres: {} },
    reducers: {
        getAPIConfiguration: (state, action) => {
            state.url = action.payload
        },
        getGeners: (state, action) => {
            state.genres = action.payload
        }
    }

})

export const {getAPIConfiguration,getGeners}=homeSlice.actions
export default homeSlice.reducer;