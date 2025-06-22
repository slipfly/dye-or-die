import React, { useEffect, useRef, useState } from 'react';
import * as styles from './MaterialsPage.module.css'
import ControlButtons from '../ControlButtons/ControlButtons';
import MainNavigation from '../MainNavigation/MainNavigation';
import { Material } from '../../types/types';
import Popup from '../Popup/Popup';
import { showElement, switchControlBtnState, setEditButtonsBehavior, switchMode } from '../../utils/utils';
import { CONTROL_BUTTONS, Database, Mode } from '../../const/const';
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import AddMaterialsPopup from '../PopupContent/AddMaterialPopup/AddMaterialPopup';


const MaterialsPage: React.FC = () => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [removalMode, setRemovalMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentMode, setCurrentMode] = useState<string | undefined>(Mode.default);
    const [editContent, setEditContent] = useState<Material | null>(null);
    const tbodyRef = useRef<HTMLTableSectionElement>(null);
    const removeBtnRef = useRef<HTMLButtonElement>(null);
    const editBtnRef = useRef<HTMLButtonElement>(null);

    const fetchMaterials = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, Database.materials));
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
            await deleteDoc(doc(db, Database.materials, id));
            setMaterials(prev => prev.filter(item => item.id !== id));
            console.log(`Material with id ${id} deleted.`);
        } catch (err) {
            console.error("Deletion failed:", err);
            alert("Failed to delete material.");
        }
    };

    const popupContent = <AddMaterialsPopup 
        popupRef={popupRef} 
        onSubmitSuccess={fetchMaterials} 
        content={editContent} 
        />;

    useEffect(() => {
        fetchMaterials();
    }, []);

    useEffect(() => {
        const tbody = tbodyRef.current;
        if (!tbody) return;

        const handleTableClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const row = target.closest('tr');
            if (!row || !row.id) return;

            const materialId = row.id;
            const material = materials.find(mat => mat.id === materialId);
            if (!material) return;
            
            switch (currentMode) {
                case Mode.remove:
                    if (confirm(`Delete "${material.name}"?`)) {
                        deleteMaterialFromFirebase(materialId);
                        setRemovalMode(false);
                    }
                    switchControlBtnState(removeBtnRef.current);
                    setCurrentMode(Mode.default);
                    break;

                case Mode.edit:                    
                    setEditContent(material);
                    showElement(popupRef.current);
                    break;
            
                default:
                    break;
            }

            fetchMaterials();
        }
        
        if (removalMode || editMode) {
            tbody.addEventListener('click', handleTableClick);
        }

        return () => {
            tbody.removeEventListener('click', handleTableClick);
        };
    }, [removalMode, editMode, materials, currentMode]);

    return (
        <main className="main">
            <MainNavigation />

            <ControlButtons
                btnParams={CONTROL_BUTTONS.MaterialsPage} 
                onClickMap={{
                    Add: () => {
                        showElement(popupRef.current);
                        switchMode(Mode.add, currentMode, setCurrentMode);
                    },
                    Remove: (e) => {
                        setEditButtonsBehavior(
                            removalMode,
                            setRemovalMode,
                            e?.currentTarget,
                            removeBtnRef
                        );
                        switchMode(Mode.remove, currentMode, setCurrentMode);
                    },
                    Edit: (e) => {
                        setEditButtonsBehavior(
                            editMode,
                            setEditMode,
                            e?.currentTarget,
                            editBtnRef
                        );
                        switchMode(Mode.edit, currentMode, setCurrentMode);
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
                                className={removalMode || editMode ? styles["delete-mode"] : ""}>
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