/** Vendor. */
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/** Reducers. */
import authRegisterReducer from '$store/feature/auth/register-slice';
import authLoginReducer from '$store/feature/auth/login-slice';

import todoListReducer from '$store/feature/todo/list-slice';
import todoCreateReducer from '$store/feature/todo/create-slice';
import todoUpdateReducer from '$store/feature/todo/update-slice';
import todoDeleteReducer from '$store/feature/todo/delete-slice';
import todoCompletedReducer from '$store/feature/todo/completed-slice';

/** Configure store. */
export const store = configureStore({
    reducer: {
        authLogin: authLoginReducer,
        authRegister: authRegisterReducer,
        todoList: todoListReducer,
        todoCreate: todoCreateReducer,
        todoUpdate: todoUpdateReducer,
        todoDelete: todoDeleteReducer,
        todoCompleted: todoCompletedReducer,
    },
});

/** Typescript stuff. */
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
