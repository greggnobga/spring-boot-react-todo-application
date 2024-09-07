/** Vendor. */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/** Hooks. */
import useValidate from '$hooks/use-validate';
import { useAppDispatch, useAppSelector } from '$hooks/use-rtk';

/** Action. */
import { authLoginRequest } from '$store/feature/auth/login-slice';

const Login = () => {
    /** Use selector. */
    const authLogin = useAppSelector((state) => state.authLogin);
    const { username } = authLogin;

    /** Map html element to validate hook. */
    const {
        value: inputUsername,
        hasError: inputUsernameHasError,
        isValid: inputUsernameIsValid,
        valueChangeHandler: inputUsernameChangeHandler,
        inputBlurHandler: inputUsernameBlurHandler,
        resetHandler: inputUsernameReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+.]*$/));

    const {
        value: inputPassword,
        hasError: inputPasswordHasError,
        isValid: inputPasswordIsValid,
        valueChangeHandler: inputPasswordChangeHandler,
        inputBlurHandler: inputPasswordBlurHandler,
        resetHandler: inputPasswordReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+.]*$/));

    /** Change class logic if valid or otherwise. */
    const inputUsernameClasses = inputUsernameHasError ? 'pt-2 font-thin text-red-400' : '';
    const inputPasswordClasses = inputPasswordHasError ? 'pt-2 font-thin text-red-400' : '';

    /** Set overall form validity. */
    let formIsValid = false;
    if (inputUsernameIsValid && inputPasswordIsValid) {
        formIsValid = true;
    }

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use navigate. */
    const navigator = useNavigate();

    /** Submit handler. */
    const submitHandler = async (event: any) => {
        /** Prevent browser default behaviour */
        event.preventDefault();

        /** Change blur state. */
        inputUsernameBlurHandler();
        inputPasswordBlurHandler();

        /** Check if there is invalid input. */
        if (!inputUsernameIsValid && !inputPasswordIsValid) {
            return;
        }

        /** Dispatch action. */
        await dispatch(authLoginRequest({ username: inputUsername, password: inputPassword }));

        /** Reset input. */
        inputUsernameReset();
        inputPasswordReset();

        /** Send to list of employees. */
        navigator('/');
    };

    /** Return something. */
    return (
        <section className='flex flex-col flex-wrap justify-center align-middle w-[50%] mx-auto'>
            <h1 className='text-center text-slate-800 px-2 py-4 text-3xl'>Login</h1>
            <div className='flex flex-col gap-2 bg-gray-100 border border-gray-200 rounded p-2'>
                <div className='grid grid-cols-1 sm:grid-cols-4'>
                    <label className='col-span-1 mr-2 px-1 py-2 text-sm' htmlFor='username'>
                        Username
                    </label>
                    <input
                        className={`col-span-3 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 ${
                            inputUsernameHasError ? 'border border-red-500' : ''
                        }`}
                        id='inputUsername'
                        name='inputUsername'
                        type='text'
                        value={inputUsername ? inputUsername : username}
                        onChange={inputUsernameChangeHandler}
                        onBlur={inputUsernameBlurHandler}
                        autoComplete='off'
                    />
                    {inputUsernameHasError && <p className={`col-span-4 ${inputUsernameClasses}`}>Please enter a valid username.</p>}
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-4'>
                    <label className='col-span-1 mr-2 px-1 py-2 text-sm' htmlFor='password'>
                        Password
                    </label>
                    <input
                        className={`col-span-3 rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 ${
                            inputPasswordHasError ? 'border border-red-500' : ''
                        }`}
                        id='inputPassword'
                        name='inputPassword'
                        type='password'
                        value={inputPassword}
                        onChange={inputPasswordChangeHandler}
                        onBlur={inputPasswordBlurHandler}
                        autoComplete='off'
                    />
                    {inputPasswordHasError && <p className={`col-span-4 ${inputPasswordClasses}`}>Please enter a valid password.</p>}
                </div>
                <button
                    className='p-2 bg-rose-600 text-slate-50 rounded shadow hover:scale-95'
                    type='submit'
                    onClick={submitHandler}
                    disabled={!formIsValid}>
                    Submit
                </button>
            </div>
        </section>
    );
};

export default Login;
