import React from 'react';
import * as styles from './ControlButtons.module.css'

interface ControlButtonsProps {
    buttonNames: string[]
}

const getControlButtons = (buttonNames: string[]) => {
    return buttonNames.map((btn) => (
        <div
            key={btn}
            className={`${styles["control-buttons__button"]} control-buttons__button--${btn.toLowerCase()}`}>
            {btn}
        </div>
    ));
};

const ControlButtons: React.FC<ControlButtonsProps> = ({ buttonNames }) => {
    return (
        <section className={styles["control-buttons"]}>
            {getControlButtons(buttonNames)}
        </section>
    );
};

export default ControlButtons;