import React from 'react';
import * as styles from './ControlButtons.module.css'

interface  ButtonParameters {
    name: string;
    type: "submit" | "reset" | "button" | undefined;
}

interface ControlButtonsProps {
    btnParams: readonly ButtonParameters[];
    onClickMap?: {
        [key: string]: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    };
}

const getControlButtons = (
    btnParams: readonly ButtonParameters[],
    onClickMap: { [key: string]: () => void } = {}
    ) => {
    return btnParams.map((btn) => (
        <button
            key={btn.name}
            type={btn.type}
            className={`${styles["control-buttons__button"]} control-buttons__button--${btn.name.toLowerCase()}`}
            onClick={onClickMap[btn.name]}>
            {btn.name}
        </button>
    ));
};

const ControlButtons: React.FC<ControlButtonsProps> = ({ btnParams, onClickMap }) => {
    return (
        <section className={styles["control-buttons"]}>
            {getControlButtons(btnParams, onClickMap || {})}
        </section>
    );
};

export default ControlButtons;