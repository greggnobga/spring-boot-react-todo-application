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
    id: string;
    title: string;
    description: string;
    completed: string;
    status: number;
};

/** Todo input type. */
type InputTodo = {
    id: number;
    completed: boolean;
};

/** Set inital state. */
const initialState: Todo = {
    loading: false,
    id: '',
    title: '',
    description: '',
    completed: '',
    status: 200,
};

/** Login request. */
export const todoCompletedRequest = createAsyncThunk<any, InputTodo, { rejectValue: Error<any> }>(
    'todo/completed',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { id, completed } = inputData;

            /** Prepare form data. */
            let form_data = new FormData();

            form_data.append('completed', completed as any);

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'PATCH',
                url: `${completed ? `/api/todos/${id}/incomplete` : `/api/todos/${id}/complete`}`,
                data: form_data,
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
export const todoCompleted = createSlice({
    name: 'todoCompleted',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(todoCompletedRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(todoCompletedRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.completed = action.payload.completed;
            state.status = action.payload.status;
        });

        builder.addCase(todoCompletedRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.completed = action.payload.completed;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default todoCompleted.reducer;
