/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Todo type. */
type Todo = {
    loading: boolean;
    message: string;
    status: number;
};

/** Todo input type. */
type InputTodo = {
    id: number;
};

/** Set inital state. */
const initialState: Todo = {
    loading: false,
    message: '',
    status: 200,
};

/** Login request. */
export const todoDeleteRequest = createAsyncThunk<any, InputTodo, { rejectValue: Error<any> }>(
    'todo/delete',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { id } = inputData;

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE',
                url: `/api/todos/${id}`,
                params: {},
            });

            /** Return something. */
            return { status, ...(data as unknown as Record<any, unknown>) };
        } catch (error: any) {
            /** Capture error details */
            if (error.response) {
                /** The request was made and the server responded with a status code */
                return rejectWithValue({
                    status: error.response.status,
                    message: error.response.data.message || 'Something went wrong!',
                });
            } else if (error.request) {
                /** The request was made but no response was received */
                return rejectWithValue({
                    message: 'No response received from the server',
                });
            } else {
                /** Something happened in setting up the request that triggered an error */
                return rejectWithValue({
                    message: error.message || 'Something went wrong!',
                });
            }
        }
    },
);

/** Export slice. */
export const todoDelete = createSlice({
    name: 'todoDelete',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(todoDeleteRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(todoDeleteRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.message = action.payload.data;
            state.status = action.payload.status;
        });

        builder.addCase(todoDeleteRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.message = action.payload.data;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default todoDelete.reducer;
