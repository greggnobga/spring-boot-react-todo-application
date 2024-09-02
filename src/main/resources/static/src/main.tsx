/** Vendor. */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

/** Import styles. */
import '$css/app.css';

/** Import base component. */
import App from '$js/app';

/** Store. */
import { store } from '$store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
);
