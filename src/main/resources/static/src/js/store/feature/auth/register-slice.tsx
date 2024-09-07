/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Register type. */
type Register = {
    loading: boolean;
    name: string;
    username: string;
    email: string;
    message: string;
    isLogged: boolean;
    status: number;
};

/** Register input type. */
type InputRegister = {
    name: string;
    username: string;
    password: string;
    email: string;
};

/** Set inital state. */
const initialState: Register = {
    loading: false,
    name: '',
    username: '',
    email: '',
    message: '',
    isLogged: false,
    status: 200,
};

/** Login request. */
export const authRegisterRequest = createAsyncThunk<any, InputRegister, { rejectValue: Error<any> }>(
    'auth/register',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { name, username, email, password } = inputData;

            /** Prepare form data. */
            let form_data = new FormData();

            form_data.append('name', name as string);
            form_data.append('username', username as string);
            form_data.append('email', email as string);
            form_data.append('password', password as string);

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                url: `/api/auth/register`,
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
export const authRegister = createSlice({
    name: 'authRegister',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(authRegisterRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(authRegisterRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.isLogged = action.payload.isLogged;
            state.message = action.payload.message;
            state.status = action.payload.status;
        });

        builder.addCase(authRegisterRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.name = action.payload.name;
            state.isLogged = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default authRegister.reducer;
