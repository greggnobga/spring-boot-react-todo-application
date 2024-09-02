/** Vendor. */
import { useEffect } from 'react';
import { useLocation } from 'react-router';

/** Scroll to top function. */
const Scroll = (props: any) => {
    /** Use location. */
    const location = useLocation();

    /** Use effect. */
    useEffect(() => {
        if (!location.hash) {
            window.scrollTo(0, 0);
        }
    }, [location]);

    /** Return something. */
    return <>{props.children}</>;
};

export default Scroll;
