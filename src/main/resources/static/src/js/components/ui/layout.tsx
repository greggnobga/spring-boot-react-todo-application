/** Vendor. */
import { Outlet } from 'react-router-dom';

/** Component. */
import Header from '$components/ui/header';
import Footer from '$components/ui/footer';

const Layout = () => {
    /** Return something. */
    return (
        <>
            <header className='bg-rose-600 text-slate-50'>
                <Header />
            </header>
            <main className='min-h-screen'>
                <section className='container mx-auto p-4'>
                    <Outlet />
                </section>
            </main>
            <footer className='bg-rose-500 text-slate-50'>
                <Footer />
            </footer>
        </>
    );
};

export default Layout;
