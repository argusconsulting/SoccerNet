import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getApi, postApi } from "../scripts/api-services";
import { api_name_trivia_category, api_name_trivia_questions } from "../constants/api-constants";

export const getTriviaCategory = createAsyncThunk(
    'trivia/triviaCategory',
    async (_, { rejectWithValue }) => {
      try {
        const response = await getApi(api_name_trivia_category);
        return response;
      } catch (error) {
        console.log('Error fetching trivia API', error);
        return rejectWithValue(error);
      }
    }
  );


  export const triviaQuestionsApi = createAsyncThunk(
    'trivia/triviaQuestions',
    async ({id}) => {
    try {
        const response = await getApi(`${api_name_trivia_questions}/${id}`);
        console.log('response trivia questions data', response);
        return response;
    } catch (error) {
        console.log('Error getting trivia questions API', error);
        return error;
    }
    }
);

  const triviaSlice = createSlice({
    name: 'trivia',
    initialState: {
      isLoading: false,
     triviaCategory:[],
   triviaQuestions:[],
      status: '',
  },
  reducers: {
  

},
    extraReducers: (builder) => {
      builder.addCase(getTriviaCategory.fulfilled, (state, action) => {
        state.triviaCategory = action?.payload;
        state.status = 'fulfilled';
        state.isLoading = false
    });
    builder.addCase(getTriviaCategory.pending, (state, action) => {
        state.status = 'pending';
        state.isLoading = true
    });
    builder.addCase(getTriviaCategory.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoading = false
    });


    // trivia questions

    
    builder.addCase(triviaQuestionsApi.fulfilled, (state, action) => {
        state.triviaQuestions = action?.payload;
        state.status = 'fulfilled';
        state.isLoading = false
    });
    builder.addCase(triviaQuestionsApi.pending, (state, action) => {
        state.status = 'pending';
        state.isLoading = true
    });
    builder.addCase(triviaQuestionsApi.rejected, (state, action) => {
        state.status = 'rejected';
        state.isLoading = false
    });


    },
  });

  export default triviaSlice.reducer;
