import React from 'react';
import * as styles from './ControlButtons.module.css'

interface ControlButtonsProps {
    buttonNames: string[];
    onClickMap?: {
        [key: string]: () => void;
    };
}

const getControlButtons = (
        buttonNames: string[],
        onClickMap: { [key: string]: () => void } = {}
    ) => {
    return buttonNames.map((btn) => (
        <div
            key={btn}
            className={`${styles["control-buttons__button"]} control-buttons__button--${btn.toLowerCase()}`}
            onClick={onClickMap[btn]}>
            {btn}
        </div>
    ));
};

const ControlButtons: React.FC<ControlButtonsProps> = ({ buttonNames, onClickMap }) => {
    return (
        <section className={styles["control-buttons"]}>
            {getControlButtons(buttonNames, onClickMap || {})}
        </section>
    );
};

export default ControlButtons;