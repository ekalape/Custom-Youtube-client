import { createSlice } from '@reduxjs/toolkit';
import { SortValues } from '../../utils/interfaces/enums';

type SortSliceType = {
    byViews: SortValues,
    byLikes: SortValues,
    byDate: SortValues,
    filterWord: string
}

const initState: SortSliceType = {
    byViews: SortValues.NONE,
    byLikes: SortValues.NONE,
    byDate: SortValues.NONE,
    filterWord: ""

}

const sortingSlice = createSlice({
    name: "sort",
    initialState: initState,
    reducers: {
        setSortingByViews(state, action) {
            state.byViews = action.payload;
            state.byLikes = SortValues.NONE;
            state.byDate = SortValues.NONE;
        },
        setSortingByLikes(state, action) {
            state.byLikes = action.payload;
            state.byViews = SortValues.NONE;
            state.byDate = SortValues.NONE;
        },
        setSortingByDate(state, action) {
            state.byDate = action.payload;
            state.byViews = SortValues.NONE;
            state.byLikes = SortValues.NONE;
        },
        setFilterWord(state, action) {
            state.filterWord = action.payload;
        }

    }

})

export const { setSortingByViews, setSortingByLikes, setSortingByDate, setFilterWord } = sortingSlice.actions;
export default sortingSlice.reducer;