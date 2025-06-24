import React, { useRef, useEffect, useState, FormEvent } from "react";
import Pristine from 'pristinejs';
import * as styles from './MaterialsPopup.module.css'
import ControlButtons from "../../ControlButtons/ControlButtons";
import { CONTROL_BUTTONS, Database, Mode } from "../../../const/const";
import { hideElement } from "../../../utils/utils";
import { db } from "../../../utils/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { Material } from "../../../types/types";

interface MaterialsPopupProps {
    popupRef: React.RefObject<HTMLDivElement | null>;    
    onSubmitSuccess: () => void;
    content?: Material | null;
    onCancel: () => void
}

const MaterialsPopup: React.FC<MaterialsPopupProps> = ({ 
    popupRef, 
    onSubmitSuccess, 
    content,
    onCancel
}) => {

    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState({
        name: content?.name ?? "",
        cost: content?.cost?.toString() ?? "",
        amount: content?.amount?.toString() ?? ""
    });
    

    const updateMaterialInFirebase = async (id: string, update: Partial<Material>) => {
        const docRef = doc(db, Database.materials, id);

        try {
            await updateDoc(docRef, update);
            console.log(`Material "${id}" updated successfully.`);
        } catch (err) {
            console.error("Error updating material:", err);
        }
    };

    const addMaterialInFirebase = async (data: Partial<Material>) => {
        try {
            const docRef = await addDoc(collection(db, "materials"), data);
            console.log("Document written with ID: ", docRef.id);
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

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

        if (!pristine.validate()) {
            return;
        }

        const newData = {
            name: formData.name.trim(),
            cost: parseFloat(formData.cost),
            amount: parseFloat(formData.amount),
            cpu: (() => {
                const cost = parseFloat(formData.cost);
                const amount = parseFloat(formData.amount);
                return amount !== 0 && cost !== 0 ? parseFloat((cost / amount).toFixed(2)) : 0;
            })()
        };

        if (content) {
            updateMaterialInFirebase(content?.id!, newData);
        } else {
            addMaterialInFirebase(newData)
        }

        onSubmitSuccess();
        form.reset();
        onCancel();
    };

    return (
        <form 
                ref={formRef} 
                className={styles["materials-form"]} 
                action="" 
                method="post"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}>
            <label className={styles["materials-form__label"]}>
                <span>Name</span>
                <input 
                    type="text" 
                    name="material-name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required />
            </label>
            <label className={styles["materials-form__label"]}>
                <span>Cost</span>
                <input 
                    type="number" 
                    name="material-cost" 
                    id="material-cost" 
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                    required />
            </label>
            <label className={styles["materials-form__label"]}>
                <span>Amount</span>
                <input 
                    type="number" 
                    name="material-amount" 
                    id="material-amount" 
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required />
            </label>

            <ControlButtons
                btnParams={CONTROL_BUTTONS.AddMaterials}
                onClickMap={{
                    Cancel: () => onCancel()
                }} />
        </form>
    );
};

export default MaterialsPopup;