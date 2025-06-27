import React from "react";
import ControlButtons from "../../ControlButtons/ControlButtons";
import { CONTROL_BUTTONS } from "../../../const/const";

interface ConfirmationPopupProps {
    onSubmitSuccess: () => void;
    content: string;
    onCancel: () => void;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
    onSubmitSuccess,
    content,
    onCancel
}) => {

    return (
        <>
            <p>{content}</p>

            <ControlButtons
                btnParams={CONTROL_BUTTONS.Confirmation}
                onClickMap={{
                    Cancel: () => onCancel(),
                    Confirm: () => onSubmitSuccess()
                }} />
        </>
    );
};

export default ConfirmationPopup;