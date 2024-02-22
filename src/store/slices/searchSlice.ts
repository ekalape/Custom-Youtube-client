import { createSlice } from '@reduxjs/toolkit';


const initState = {
    searchWord: "",
    videos: [],
}

const searchSlice = createSlice({
    name: "search",
    initialState: initState,
    reducers: {
        setSearchWordAction: (state, action) => {
            state.searchWord = action.payload
        },
        setVideosAction: (state, action) => {
            state.videos = action.payload
        }
    }

})

export const { setSearchWordAction, setVideosAction } = searchSlice.actions;
export default searchSlice.reducer;