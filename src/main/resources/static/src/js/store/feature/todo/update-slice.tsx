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
    completed: any;
    status: number;
};

/** Todo input type. */
type InputTodo = {
    id: string;
    token: string;
    title: string;
    description: string;
    completed: any;
};

/** Set inital state. */
const initialState: Todo = {
    loading: false,
    id: '',
    title: '',
    description: '',
    completed: false,
    status: 200,
};

/** Login request. */
export const todoUpdateRequest = createAsyncThunk<any, InputTodo, { rejectValue: Error<any> }>(
    'todo/update',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { id, token, title, description, completed } = inputData;

            /** Prepare form data. */
            let form_data = new FormData();

            form_data.append('title', title as string);
            form_data.append('description', description as string);
            form_data.append('completed', completed as any);

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                method: 'PUT',
                url: `/api/todos/${id}`,
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
export const todoUpdate = createSlice({
    name: 'todoUpdate',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(todoUpdateRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(todoUpdateRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.id = action.payload.id;
            state.title = action.payload.title;
            state.description = action.payload.description;
            state.completed = action.payload.completed;
            state.status = action.payload.status;
        });

        builder.addCase(todoUpdateRequest.rejected, (state, action: any) => {
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
export default todoUpdate.reducer;
