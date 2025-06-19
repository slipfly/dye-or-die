import React, { useRef, useEffect } from "react";
import Pristine from 'pristinejs';
import * as styles from './AddMaterialPopup.module.css'
import ControlButtons from "../../ControlButtons/ControlButtons";
import { CONTROL_BUTTONS } from "../../../const/const";
import { hideElement } from "../../../utils/utils";
import { db } from "../../../utils/firebase";
import { collection, addDoc } from "firebase/firestore";

interface AddMaterialsPopupProps {
    popupRef: React.RefObject<HTMLDivElement | null>;
}

const AddMaterialsPopup: React.FC<AddMaterialsPopupProps> = ({ popupRef }) => {
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        const form = formRef.current;
        if (!form) return;

        const pristine = new Pristine(form, {
            classTo: styles["materials-form__label"],
            errorClass: 'has-error',
            successClass: 'has-success',
            errorTextParent: styles["materials-form__label"],
            errorTextTag: 'div',
            errorTextClass: 'form-error',
        });

        const materialNameInput = form.querySelector<HTMLInputElement>('input[name="material-name"]');
        const materialCostInput = form.querySelector<HTMLInputElement>('input[name="material-cost"]');
        const materialAmountInput = form.querySelector<HTMLInputElement>('input[name="material-amount"]');
        
        if (materialNameInput) {
            pristine.addValidator(
                materialNameInput,
                (value: string) => value.trim().length > 0,
                'Material name can’t be empty!'
            );
        }

        const handleSubmit = async (e: Event) => {
            e.preventDefault();

            if (!pristine.validate()) {
                return;
            }

            const name = materialNameInput?.value ?? "";
            const cost = parseFloat(materialCostInput?.value ?? "0");
            const amount = parseFloat(materialAmountInput?.value ?? "0");
            const cpu = amount !== 0 && cost !== 0 ? cost / amount : 0;
            

            try {
                const docRef = await addDoc(collection(db, "materials"), {
                    name,
                    cost,
                    amount,
                    cpu
                });

                console.log("Document written with ID: ", docRef.id);
                hideElement(popupRef.current!);
            } catch (err) {
                console.error("Error adding document: ", err);
                
            }
        };

        form.addEventListener('submit', handleSubmit);

        // Optional: cleanup
        return () => {
            form.removeEventListener('submit', handleSubmit);
        };
    }, []);

    return (
        <form 
                ref={formRef} 
                className={styles["materials-form"]} 
                action="" 
                method="post">
            <label className={styles["materials-form__label"]}>
                <span>Name</span>
                <input type="text" name="material-name" required />
            </label>
            <label className={styles["materials-form__label"]}>
                <span>Cost</span>
                <input type="number" name="material-cost" id="material-cost" required />
            </label>
            <label className={styles["materials-form__label"]}>
                <span>Amount</span>
                <input type="number" name="material-amount" id="material-amount" required />
            </label>
            <div>
                <span className={styles["materials-form__label"]}>Cost per unit</span>
                <div className={styles["material-cpu"]}></div>
            </div>

            <ControlButtons
                btnParams={CONTROL_BUTTONS.AddMaterials}
                onClickMap={{
                    Cancel: () => {
                        hideElement(popupRef.current!);
                    }
                }} />
        </form>
    );
};

export default AddMaterialsPopup;