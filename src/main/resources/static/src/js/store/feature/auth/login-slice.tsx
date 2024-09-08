/** Vendor. */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

/** Error type. */
type Error<T> = {
    error?: T;
    message?: string;
    status?: number;
};

/** Login type. */
type Login = {
    loading: boolean;
    message: string;
    token: string;
    status: number;
};

/** Login input type. */
type InputLogin = {
    username: string;
    password: string;
};

/** Set inital state. */
const initialState: Login = {
    loading: false,
    message: '',
    token: '',
    status: 200,
};

/** Login request. */
export const authLoginRequest = createAsyncThunk<any, InputLogin, { rejectValue: Error<any> }>(
    'auth/login',
    async (inputData, { rejectWithValue }) => {
        try {
            /** Deconstruct input data. */
            const { username, password } = inputData;

            /** Prepare form data. */
            let form_data = new FormData();

            form_data.append('username', username as string);
            form_data.append('password', password as string);

            /** Request data from backend. */
            const { data, status } = await axios({
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                url: `/api/auth/login`,
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
export const authLogin = createSlice({
    name: 'authLogin',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        /** Detail request case. */
        builder.addCase(authLoginRequest.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(authLoginRequest.fulfilled, (state, action: any) => {
            state.loading = false;
            state.message = action.payload.message;
            state.token = 'Bearer ' + action.payload.accessToken;
            state.status = action.payload.status;
        });

        builder.addCase(authLoginRequest.rejected, (state, action: any) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = action.payload.status;
        });
    },
});

/** Export something. */
export default authLogin.reducer;
