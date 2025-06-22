import React, { forwardRef } from 'react';
import * as styles from './Popup.module.css';

interface PopupProps {
    children: React.ReactNode;
}

const Popup = forwardRef<HTMLDivElement, PopupProps>((
    {children}, 
    ref) => {   

    return (
        <section ref={ref} className="popup">
            <section className={styles.popup__disabler}></section>
            <section className={styles.popup__box}>
                {children}
            </section>
        </section>
    );
});

export default Popup;