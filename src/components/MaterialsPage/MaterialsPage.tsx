import React, { useEffect, useRef, useState } from 'react';
import * as styles from './MaterialsPage.module.css'
import ControlButtons from '../ControlButtons/ControlButtons';
import MainNavigation from '../MainNavigation/MainNavigation';
import { Material } from '../../types/types';
import Popup from '../Popup/Popup';
import { showElement, activateControlBtn, deactivateControlBtn, setEditButtonsBehavior } from '../../utils/utils';
import { CONTROL_BUTTONS } from '../../const/const';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import AddMaterialsPopup from '../PopupContent/AddMaterialPopup/AddMaterialPopup';


const MaterialsPage: React.FC = () => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [removalMode, setRemovalMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const tbodyRef = useRef<HTMLTableSectionElement>(null);
    const removeBtnRef = useRef<HTMLButtonElement>(null);
    const editBtnRef = useRef<HTMLButtonElement>(null);    

    const fetchMaterials = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "materials"));
            const materialsData: Material[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    name: data.name,
                    cost: data.cost,
                    amount: data.amount,
                    cpu: data.cpu
                };
            });
            setMaterials(materialsData);
        } catch (err) {
            console.error("Error fetching materials:", err);
        }
    };

    const deleteMaterialFromFirebase = async (id: string) => {
        try {
            await deleteDoc(doc(db, "materials", id));
            setMaterials(prev => prev.filter(item => item.id !== id));
            console.log(`Material with id ${id} deleted.`);
        } catch (err) {
            console.error("Deletion failed:", err);
            alert("Failed to delete material.");
        }
    };

    const popupContent = <AddMaterialsPopup popupRef={popupRef} onSubmitSuccess={fetchMaterials} />;

    useEffect(() => {
        fetchMaterials();
    }, []);

    useEffect(() => {
        const tbody = tbodyRef.current;
        if (!tbody) return;

        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const row = target.closest('tr');
            if (!row || !row.id) return;

            const materialId = row.id;
            const material = materials.find(mat => mat.id === materialId);
            if (!material) return;

            if (confirm(`Delete "${material.name}"?`)) {
                deleteMaterialFromFirebase(materialId);
                setRemovalMode(false);
                deactivateControlBtn(removeBtnRef.current);
            }
            
            fetchMaterials();
        }

        if (removalMode) {
            tbody.addEventListener('click', handleClick);
        }

        return () => {
            tbody.removeEventListener('click', handleClick);
        };
    }, [removalMode, materials]);

    return (
        <main className="main">
            <MainNavigation />

            <ControlButtons 
                btnParams={CONTROL_BUTTONS.MaterialsPage} 
                onClickMap={{
                    Add: () => {
                        showElement(popupRef.current);
                    },
                    Remove: (e) => {
                        setEditButtonsBehavior(
                            removalMode,
                            setRemovalMode,
                            e?.currentTarget,
                            removeBtnRef
                        );                      
                    },
                    Edit: (e) => {
                        setEditButtonsBehavior(
                            editMode,
                            setEditMode,
                            e?.currentTarget,
                            editBtnRef
                        ); 
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
                <tbody ref={tbodyRef}>
                    {materials
                        .slice() // create a shallow copy so we don’t mutate the original
                        .sort((a, b) => a.name.localeCompare(b.name)) // alphabetically by `name`
                        .map((item) => (
                            <tr 
                                key={item.id} 
                                id={`${item.id}`}
                                className={removalMode ? styles["delete-mode"] : ""}>
                                <td>{item.name}</td>
                                <td>{item.cost}</td>
                                <td>{item.amount}</td>
                                <td>{item.cpu}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <Popup ref={popupRef} children={popupContent} />
        </main>
    );
};

export default MaterialsPage;