import { Mode } from "../const/const";
import React from "react";

export const switchControlBtnState = (button: HTMLButtonElement | undefined | null) => {
    if (button?.classList.contains('active')) {
        button?.classList.remove("active");
    } else {
        button?.classList.add("active");
    }    
};

export const setEditButtonsBehavior = (
    currentModeState: boolean,
    setModeState: (value: boolean) => void,
    btn: HTMLButtonElement | undefined | null,
    btnRef: React.RefObject<HTMLButtonElement | null>
) => {
    if (!currentModeState) {
        btnRef.current = btn as HTMLButtonElement;
    }
    switchControlBtnState(btn);
    setModeState(!currentModeState); 
};

export const switchMode = (
    chosenMode: string | undefined, 
    currentMode: string | undefined, 
    setCurrentMode: (value: string | undefined) => void,
) =>  {
    if (currentMode !== chosenMode) {
        setCurrentMode(chosenMode);
    } else {
        setCurrentMode(Mode.default);
    }
};

export const handleModeToggle = (
    mode: 'edit' | 'remove',
    currentModeState: boolean,
    setModeState: React.Dispatch<React.SetStateAction<boolean>>,
    btn: HTMLButtonElement | undefined | null,
    btnRef: React.RefObject<HTMLButtonElement | null>,
    currentMode: string | undefined,
    setCurrentMode: (value: string | undefined) => void,
) => {
    setEditButtonsBehavior(currentModeState, setModeState, btn, btnRef);
    switchMode(mode === 'edit' ? Mode.edit : Mode.remove, currentMode, setCurrentMode);
};