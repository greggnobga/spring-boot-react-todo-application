/** Vendor. */
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/** Hooks. */
import useValidate from '$hooks/use-validate';
import { useAppDispatch, useAppSelector } from '$hooks/use-rtk';

/** Action. */
import { todoListRequest } from '$store/feature/todo/list-slice';
import { todoCreateRequest } from '$store/feature/todo/create-slice';
import { todoUpdateRequest } from '$store/feature/todo/update-slice';
import { todoDeleteRequest } from '$store/feature/todo/delete-slice';

const Todo = () => {
    /** Use selector. */
    const todoList = useAppSelector((state) => state.todoList);
    const { todos } = todoList;

    /** Use location. */
    const location = useLocation();
    const { id, title, description, completed, action } = location.state || {};

    /** Use state. */
    const [inputCompleted, setInputCompleted] = useState(completed || 0);

    /** Map html element to validate hook. */
    const {
        value: inputTitle,
        hasError: inputTitleHasError,
        isValid: inputTitleIsValid,
        valueChangeHandler: inputTitleChangeHandler,
        inputBlurHandler: inputTitleBlurHandler,
        resetHandler: inputTitleReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+.]*$/));

    const {
        value: inputDescription,
        hasError: inputDescriptionHasError,
        isValid: inputDescriptionIsValid,
        valueChangeHandler: inputDescriptionChangeHandler,
        inputBlurHandler: inputDescriptionBlurHandler,
        resetHandler: inputDescriptionReset,
    } = useValidate((value: any) => value.trim() !== '' && value.match(/^[ A-Za-z0-9!@#$%^&*()_+.]*$/));

    /** Change class logic if valid or otherwise. */
    const inputTitleClasses = inputTitleHasError ? 'pt-2 font-thin text-red-400' : '';
    const inputDescriptionClasses = inputDescriptionHasError ? 'pt-2 font-thin text-red-400' : '';

    /** Set overall form validity. */
    let formIsValid = false;
    if (inputTitleIsValid && inputDescriptionIsValid) {
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
        inputTitleBlurHandler();
        inputDescriptionBlurHandler();

        /** Check if there is invalid input. */
        if (!inputTitleIsValid && !inputDescriptionIsValid) {
            return;
        }

        /** Dispatch action. */
        if (action === 'update') {
            await dispatch(todoUpdateRequest({ id, title: inputTitle, description: inputDescription, completed: inputCompleted }));
        } else {
            await dispatch(todoCreateRequest({ title: inputTitle, description: inputDescription, completed: inputCompleted }));
        }

        /** Reset input. */
        inputTitleReset();
        inputDescriptionReset();

        /** Update list. */
        await dispatch(todoListRequest());

        /** Send to list of employees. */
        navigator('/todos');
    };

    /** Delete handler. */
    const deleteHandler = async () => {
        await dispatch(todoDeleteRequest({ id }));

        /** Update list. */
        await dispatch(todoListRequest());

        /** Send to list of employees. */
        navigator('/todos');
    };

    /** Cancel handler. */
    const cancelHandler = async () => {
        /** Update list. */
        await dispatch(todoListRequest());

        /** Back to list of employees. */
        navigator('/todos');
    };

    /** Return something. */
    return (
        <>
            {action === 'delete' ? (
                <div className='container mx-auto bg-rose-50 border border-rose-100 px-4 py-2'>
                    <div className='flex flex-wrap flex-col items-center justify-center'>
                        <p className='pt-6'>Are your sure you want to delete {title}</p>
                        <div className='mt-6 flex items-center justify-center gap-x-6'>
                            <button type='button' className='text-sm font-semibold leading-6 text-gray-900' onClick={cancelHandler}>
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='rounded-md bg-rose-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600'
                                onClick={() => deleteHandler()}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className='container mx-auto bg-rose-50 border border-rose-100 px-4 py-2'>
                    <h1 className='p-2 text-center font-bold text-2xl uppercase'>{action} Todo</h1>
                    <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                        <div className='col-span-full'>
                            <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900'>
                                Title
                            </label>
                            <div className='mt-2'>
                                <input
                                    className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 ${
                                        inputTitleHasError ? 'border border-red-500' : ''
                                    }`}
                                    id='inputTitle'
                                    name='inputTitle'
                                    type='inputTitle'
                                    value={inputTitle ? inputTitle : title}
                                    onChange={inputTitleChangeHandler}
                                    onBlur={inputTitleBlurHandler}
                                    autoComplete='off'
                                />
                                {inputTitleHasError && <p className={`${inputTitleClasses}`}>Please enter a valid title.</p>}
                            </div>
                        </div>

                        <div className='col-span-full'>
                            <label htmlFor='description' className='block text-sm font-medium leading-6 text-gray-900'>
                                Description
                            </label>
                            <div className='mt-2'>
                                <input
                                    className={`block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-0 focus:none sm:text-sm sm:leading-6 ${
                                        inputDescriptionHasError ? 'border border-red-500' : ''
                                    }`}
                                    id='inputDescription'
                                    name='inputDescription'
                                    type='inputDescription'
                                    value={inputDescription ? inputDescription : description}
                                    onChange={inputDescriptionChangeHandler}
                                    onBlur={inputDescriptionBlurHandler}
                                    autoComplete='off'
                                />
                                {inputDescriptionHasError && <p className={`${inputDescriptionClasses}`}>Please enter a valid description.</p>}
                            </div>
                        </div>

                        <div className='col-span-full'>
                            <label htmlFor='completed' className='block text-sm font-medium leading-6 text-gray-900'>
                                Completed
                            </label>
                            <div className='mt-2'>
                                <input
                                    className='mr-2'
                                    type='radio'
                                    name='inputCompleted'
                                    value='true'
                                    onChange={(e) => setInputCompleted(e.target.value)}
                                />
                                Yes
                                <input
                                    className='mr-2 ml-2'
                                    type='radio'
                                    name='inputCompleted'
                                    value='false'
                                    onChange={(e) => setInputCompleted(e.target.value)}
                                />
                                No
                            </div>
                        </div>
                    </div>

                    <div className='mt-6 flex items-center justify-end gap-x-6'>
                        <button type='button' className='text-sm font-semibold leading-6 text-gray-900' onClick={() => cancelHandler()}>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='rounded-md bg-rose-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:bg-slate-50 disabled:text-slate-400'
                            disabled={!formIsValid}
                            onClick={(e) => submitHandler(e)}>
                            Save
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Todo;
