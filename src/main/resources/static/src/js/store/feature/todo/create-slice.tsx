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
    title: string;
    description: string;
    completed: any;
    status: number;
};

/** Todo input type. */
type InputTodo = {
    title: string;
    description: string;
    completed: any;
};

/** Set inital state. */
const initialState: Todo = {
    loading: false,
    title: '',
    description: '',
    completed: false,
    status: 200,
};

/** Login request. */
export const todoCreateRequest = createAsyncThunk<any, InputTodo, { rejectValue: Error<any> }>(
    'todo/create',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { title, description, completed } = inputData;

            /** Prepare form data. */
            let form_data = new FormData();

            form_data.append('title', title as string);
            form_data.append('description', description as string);
            form_data.append('completed', completed as any);

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                url: `/api/todos`,
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
export const todoCreate = createSlice({
    name: 'todoCreate',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(todoCreateRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(todoCreateRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.completed = action.payload.completed;
            state.status = action.payload.status;
        });

        builder.addCase(todoCreateRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.completed = action.payload.completed;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default todoCreate.reducer;
