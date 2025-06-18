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