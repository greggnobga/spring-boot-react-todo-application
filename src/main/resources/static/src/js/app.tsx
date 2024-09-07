/** Vendor. */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/** Components. */
import Layout from '$components/ui/layout';
import Scroll from '$components/ui/scroll';

import Home from '$components/home';
import Register from '$components/auth/register';
import Login from '$components/auth/login';

import Todos from '$components/todo/todos';
import Todo from '$components/todo/todo';

/** Main. */
const App = () => {
    /** Return something. */
    return (
        <Router>
            <Scroll>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                    </Route>

                    <Route path='/' element={<Layout />}>
                        <Route path='/todos' element={<Todos />} />
                        <Route path='/create-todo' element={<Todo />} />
                        <Route path='/update-todo' element={<Todo />} />
                        <Route path='/delete-todo' element={<Todo />} />
                    </Route>
                </Routes>
            </Scroll>
        </Router>
    );
};

export default App;
