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

export const activateControlBtn = (button: HTMLButtonElement | undefined | null) => {
    button?.classList.add("active");
};

export const deactivateControlBtn = (button: HTMLButtonElement | undefined | null) => {
    button?.classList.remove("active");
};

export const setEditButtonsBehavior = (
    currentMode: boolean,
    setMode: (value: boolean) => void,
    btn: HTMLButtonElement | undefined | null,
    btnRef: React.RefObject<HTMLButtonElement | null>
) => {
    if (currentMode) {
        deactivateControlBtn(btn);
        setMode(false);
    } else {
        activateControlBtn(btn);
        setMode(true);
        btnRef.current = btn as HTMLButtonElement;
    }  
}