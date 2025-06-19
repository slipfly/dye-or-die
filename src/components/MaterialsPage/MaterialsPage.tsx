import React, { useRef } from 'react';
import * as styles from './MaterialsPage.module.css'
import ControlButtons from '../ControlButtons/ControlButtons';
import MainNavigation from '../MainNavigation/MainNavigation';
import { Material } from '../../types/types';
import Popup from '../Popup/Popup';
import { showElement } from '../../utils/utils';
import { CONTROL_BUTTONS } from '../../const/const';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import AddMaterialsPopup from '../PopupContent/AddMaterialPopup/AddMaterialPopup';

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
    const popupContent = <AddMaterialsPopup popupRef={popupRef} />;

    return (
        <main className="main">
            <MainNavigation />

            <ControlButtons 
                btnParams={CONTROL_BUTTONS.MaterialsPage} 
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

            <Popup ref={popupRef}  children={popupContent}/>
        </main>
    );
};

export default MaterialsPage;