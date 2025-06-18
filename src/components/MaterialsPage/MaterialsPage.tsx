import React, { useRef } from 'react';
import * as styles from './MaterialsPage.module.css'
import ControlButtons from '../ControlButtons/ControlButtons';
import MainNavigation from '../MainNavigation/MainNavigation';
import { Material } from '../../types/types';
import Popup from '../Popup/Popup';
import { hideElement, showElement } from '../../utils/utils';
import Pristine from 'pristinejs';

const CONTROL_BUTTONS = {
    MaterialsPage: ['Add', 'Edit', 'Remove'],
    AddMaterials: ['Save', 'Cancel']
};

const renderAddMaterialsPopup = (popupRef: React.RefObject<HTMLDivElement | null>) => {
    

    return (
        <>
            <form className={styles["materials-form"]} action="" method="post">
                <label>
                    <span className={styles["materials-form__label"]}>Name</span>
                    <input type="text" id="material-name" required/>
                </label>
                <label>
                    <span className={styles["materials-form__label"]}>Cost</span>
                    <input type="number" name="material-cost" id="material-cost" required/>
                </label>
                <label>
                    <span className={styles["materials-form__label"]}>Amount</span>
                    <input type="number" name="material-amount" id="material-amount" required/>
                </label>
                <div>
                    <span className={styles["materials-form__label"]}>Cost per unit</span>
                    <div className={styles["material-form__cpu"]}>22</div>
                </div>
            </form>
        
            <ControlButtons
                buttonNames={CONTROL_BUTTONS.AddMaterials}
                onClickMap={{
                    Cancel: () => {
                        hideElement(popupRef.current!);
                    }
                }} />
        </>
    );
};

import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

const addMaterial = async (material: object) => {
    try {
        await addDoc(collection(db, "materials"), material);
        console.log("Good girl — material added 🖤");
    } catch (e) {
        console.error("Shit broke: ", e);
    }
};


interface MaterialsPageProps {
    data: Material[];
};

const MaterialsPage: React.FC<MaterialsPageProps> = ({data}) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const popupAddMaterials = renderAddMaterialsPopup(popupRef);

    return (
        <main className="main">
            <MainNavigation />

            <ControlButtons 
                buttonNames={CONTROL_BUTTONS.MaterialsPage} 
                onClickMap={{
                    Add: () => {
                        console.log('add');
                        showElement(popupRef.current);
                    }
                }} />

            <table className={styles["materials-table"]}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cost</th>
                        <th>Amount</th>
                        <th>CPU</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        .slice() // create a shallow copy so we don’t mutate the original
                        .sort((a, b) => a.name.localeCompare(b.name)) // alphabetically by `name`
                        .map((item) => (
                            <tr key={item.id} id={`${item.id}`}>
                                <td>{item.name}</td>
                                <td>{item.cost}</td>
                                <td>{item.amount}</td>
                                <td>{item.cpu}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <Popup ref={popupRef}  children={popupAddMaterials}/>
        </main>
    );
};

export default MaterialsPage;