import React, { useEffect, useRef, useState } from 'react';
import * as styles from './MaterialsPage.module.css'
import ControlButtons from '../ControlButtons/ControlButtons';
import MainNavigation from '../MainNavigation/MainNavigation';
import { Material } from '../../types/types';
import Popup from '../Popup/Popup';
import { switchControlBtnState, setEditButtonsBehavior, switchMode } from '../../utils/utils';
import { CONTROL_BUTTONS, Mode } from '../../const/const';
import MaterialsPopup from '../PopupContent/MaterialsPopup/MaterialsPopup';
import { useMaterialTableClick } from '../../hooks/useMaterialTableClick';
import { deleteMaterial, fetchAndSetMaterials } from '../../services/materialService';


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
    const [popup, setPopup] = useState(false);

    const closePopup = () => {
        setPopup(false);
    };

    const openPopup = () => {
        setPopup(true)
    }

    const popupContent = <MaterialsPopup 
        popupRef={popupRef} 
        onSubmitSuccess={() => fetchAndSetMaterials(setMaterials)} 
        content={editContent} 
        onCancel={closePopup}
        />;

    useEffect(() => {
        fetchAndSetMaterials(setMaterials);
    }, []);

    const onRemove = async (material: Material) => {
        if (confirm(`Remove "${material.name}"?`)) {

            await deleteMaterial(material.id);

            setMaterials(prev => prev.filter(item => item.id !== material.id));
            console.log(`Material with id ${material.id} deleted.`);
            
            setRemovalMode(false);
        }
        switchControlBtnState(removeBtnRef.current);
        setCurrentMode(Mode.default);
    };

    const onEdit = (material: Material) => {
        setEditContent(material);
        openPopup();
    };

    useMaterialTableClick(
        tbodyRef,
        currentMode,
        materials,
        onRemove,
        onEdit
    );

    return (
        <main className="main">
            <MainNavigation />

            <ControlButtons
                btnParams={CONTROL_BUTTONS.MaterialsPage} 
                onClickMap={{
                    Add: () => {
                        // showElement(popupRef.current);
                        openPopup();
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

            {popup ? <Popup ref={popupRef} children={popupContent} /> : ''}
            
        </main>
    );
};

export default MaterialsPage;