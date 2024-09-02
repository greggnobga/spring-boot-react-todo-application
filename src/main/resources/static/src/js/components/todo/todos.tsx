/** Vendor. */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Hooks. */
import { useAppDispatch, useAppSelector } from '$hooks/use-rtk';

/** Action. */
import { todoListRequest } from '$store/feature/todo/list-slice';
import { todoCompletedRequest } from '$store/feature/todo/completed-slice';

const Todos = () => {
    /** Use selector. */
    const todoList = useAppSelector((state) => state.todoList);
    const { todos } = todoList;

    /** Use dispatch. */
    const dispatch = useAppDispatch();

    /** Use effect. */
    useEffect(() => {
        /** Fetch todo on load. */
        dispatch(todoListRequest());
    }, []);

    /** Use navigate. */
    const navigator = useNavigate();

    /** Create todo handler. */
    const createTodoHandler = () => {
        /** Navigate out. */
        navigator('/create-todo', { state: { action: 'create' } });
    };

    /** Delete todo handler. */
    const deleteTodoHandler = (id: number) => {
        /** Get todo details. */
        const details = todos.filter((item) => item.id === id);

        /** Navigate out. */
        navigator('/delete-todo', {
            state: {
                id,
                title: details[0].title,
                action: 'delete',
            },
        });
    };

    /** Update todo handler. */
    const updateTodoHandler = (id: number) => {
        /** Get todo details. */
        const details = todos.filter((item) => item.id === id);

        /** Navigate out. */
        navigator('/update-todo', {
            state: {
                id,
                title: details[0].title,
                description: details[0].description,
                completed: details[0].completed,
                action: 'update',
            },
        });
    };

    /** Complete todo handler. */
    const completeTodoHandler = async (id: number) => {
        /** Get todo details. */
        const details = todos.filter((item) => item.id === id);

        /** Dispatch completed. */
        await dispatch(todoCompletedRequest({ id, completed: details[0].completed }));

        /** Dispatch list to refresh the list. */
        await dispatch(todoListRequest());
    };

    /** Return something. */
    return (
        <div className='relative overflow-x-auto'>
            <h1 className='text-slate-700 text-center font-bold text-3xl uppercase'>List Of Todos</h1>
            <button
                className='bg-sky-500 py-2 px-4 my-4 shadow-md text-slate-50 rounded hover:bg-sky-600 hover:scale-95'
                onClick={() => createTodoHandler()}>
                Create Todo
            </button>
            <table className='w-full text-sm text-left rtl:text-right text-gray-800 shadow-md'>
                <thead className='text-xs text-slate-50 uppercase bg-rose-500'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>
                            ID
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Title
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Description
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Completed
                        </th>
                        <th scope='col' className='px-6 py-3'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {todos ? (
                        todos.map((item) => {
                            return (
                                <tr key={item.id} className='odd:bg-rose-50  even:bg-rose-100'>
                                    <td className='px-6 py-4'>{item.id}</td>
                                    <td className='px-6 py-4'>{item.title}</td>
                                    <td className='px-6 py-4'>{item.description}</td>
                                    <td className='px-6 py-4'>{item.completed ? 'Yes' : 'No'}</td>
                                    <td className='px-6 py-4'>
                                        <button
                                            className='p-2 mx-2 pointer bg-blue-600 text-white rounded hover:bg-blue-400 hover:rounded hover:text-white'
                                            type='button'
                                            onClick={() => completeTodoHandler(item.id)}>
                                            {item.completed ? 'Incomplete' : 'Complete'}
                                        </button>
                                        <button
                                            className='p-2 mx-2 pointer bg-sky-600 text-white rounded hover:bg-sky-400 hover:rounded hover:text-white'
                                            type='button'
                                            onClick={() => updateTodoHandler(item.id)}>
                                            Update
                                        </button>
                                        <button
                                            className='p-2 mx-2 pointer bg-rose-600 text-white rounded hover:bg-rose-400 hover:rounded hover:text-white'
                                            type='button'
                                            onClick={() => deleteTodoHandler(item.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <p className='p-2'>No todo added yet.</p>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Todos;
