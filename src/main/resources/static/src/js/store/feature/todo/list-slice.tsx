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
    id: number;
    title: string;
    description: string;
    completed: boolean;
};

/** Todo List type. */
type Todos = {
    loading: boolean;
    todos: Todo[];
    status: number;
};

/** Set inital state. */
const initialState: Todos = {
    loading: false,
    status: 200,
    todos: [],
};

/** Todo list request. */
export const todoListRequest = createAsyncThunk<any, void, { rejectValue: Error<any> }>('todo/list', async (inputData, { rejectWithValue }) => {
    try {
        /** Request data from backend. */
        const { data, status } = await axios({
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'GET',
            url: '/api/todos',
        });

        /** Return something. */
        return { status, data };
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
});

/** Export slice. */
export const todoList = createSlice({
    name: 'todoList',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(todoListRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(todoListRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.todos = action.payload.data;
            state.status = action.payload.status;
        });

        builder.addCase(todoListRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.todos = action.payload.data;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default todoList.reducer;
