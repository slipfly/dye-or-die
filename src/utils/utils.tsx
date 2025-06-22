import { Mode } from "../const/const";

export const showElement = (el: HTMLElement | null) => {
    if  (el) {
        el.classList.remove('visually-hidden');
    }    
};

export const hideElement = (el: HTMLElement | null) => {
    if (el) {
        el.classList.add('visually-hidden');
    }
};

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
    setCurrentMode: (value: string | undefined) => void
) =>  {
    if (currentMode !== chosenMode) {
        setCurrentMode(chosenMode);
    } else {
        setCurrentMode(Mode.default);
    }
};