import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getApi} from '../scripts/api-services';
import {api_name_search} from '../constants/api-constants';

export const searchHandler = createAsyncThunk(
  'search/searchApi',
  async query => {
    try {
      const response = await getApi(`${api_name_search}?name=${query}`);
      return response;
    } catch (error) {
      console.log('Error in search', error);
      return rejectWithValue(error);
    }
  },
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    isLoading: false,
    searchData: [],
    status: '',
  },
  reducers: {
    setSearchData: (state, action) => {
      state.searchData = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(searchHandler.fulfilled, (state, action) => {
      state.searchData = action?.payload?.groups;
      state.status = 'fulfilled';
      state.isLoading = false;
    });
    builder.addCase(searchHandler.pending, (state, action) => {
      state.status = 'pending';
      state.isLoading = true;
    });
    builder.addCase(searchHandler.rejected, (state, action) => {
      state.status = 'rejected';
      state.isLoading = false;
    });
  },
});
export const {setSearchData} = searchSlice.actions;
export default searchSlice.reducer;
