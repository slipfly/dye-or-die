import React from 'react';
import * as styles from './Popup.module.css';
import ControlButtons from '../ControlButtons/ControlButtons';

const CONTROL_BUTTONS = ['Save', 'Cancel'];

const Popup: React.FC = () => {
    

    return (
        <section className="popup visually-hidden">
            <section className={styles.popup__disabler}></section>
            <section className={styles.popup__box}>
                <label className="popup__label">
                    <span className={styles["popup__label-text"]}>Material</span>
                    <input className={styles.popup__input} type="text" id="prep-material-name" />
                </label>
                <label className="popup__label">
                    <span className={styles["popup__label-text"]}>Amount</span>
                    <input className={styles.popup__input} type="number" id="prep-material-amount" />
                </label>
                <ControlButtons buttonNames={CONTROL_BUTTONS}></ControlButtons>
            </section>
        </section>
    );
};

export default Popup;