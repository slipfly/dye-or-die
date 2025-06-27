import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as styles from './MaterialsPage.module.css'
import ControlButtons from '../ControlButtons/ControlButtons';
import MainNavigation from '../MainNavigation/MainNavigation';
import { Material } from '../../types/types';
import Popup from '../Popup/Popup';
import { switchControlBtnState, switchMode, handleModeToggle } from '../../utils/utils';
import { CONTROL_BUTTONS, Mode } from '../../const/const';
import MaterialsPopup from '../PopupContent/MaterialsPopup/MaterialsPopup';
import { useMaterialTableClick } from '../../hooks/useMaterialTableClick';
import { deleteMaterial, fetchAndSetMaterials } from '../../services/materialService';
import ConfirmationPopup from '../PopupContent/ConfirmationPopup/ConfirmationPopup';


const MaterialsPage: React.FC = () => {
    const materialPopupRef = useRef<HTMLDivElement>(null);
    const [materialPopup, setMaterialPopup] = useState(false);
    const [materialToRemove, setMaterialToRemove] = useState<Material | null>(null);
    const confirmationPopupRef = useRef<HTMLDivElement>(null);
    const [confirmationPopup, setConfirmationPopup] = useState(false);

    const [materials, setMaterials] = useState<Material[]>([]);

    const [removalMode, setRemovalMode] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentMode, setCurrentMode] = useState<string | undefined>(Mode.default);

    const [editContent, setEditContent] = useState<Material | null>(null);

    const tbodyRef = useRef<HTMLTableSectionElement>(null);
    const removeBtnRef = useRef<HTMLButtonElement>(null);
    const editBtnRef = useRef<HTMLButtonElement>(null);

    const sortedMaterials = useMemo(() =>
        [...materials].sort((a, b) => a.name.localeCompare(b.name)),
        [materials]
    );

    useEffect(() => {
        fetchAndSetMaterials(setMaterials);
    }, []);

    const exitEditModeIfActive = () => {
        if (editMode) {
            handleModeToggle(
                Mode.edit,
                editMode,
                setEditMode,
                editBtnRef.current,
                editBtnRef,
                currentMode,
                setCurrentMode
            );
        }
    };
    

    const handleCloseConfirmation = () => {
        setConfirmationPopup(false);
        setMaterialToRemove(null);
    };

    const handleSubmitRemoval = async (id: string) => {
        try {
            await deleteMaterial(id);
            setMaterials(prev => prev.filter(item => item.id !== id));
            console.log(`Material with id ${id} deleted.`);
        } catch (err) {
            console.error("Failed to delete material:", err);
        } finally {
            setRemovalMode(false);
            handleCloseConfirmation();
        }
    }

    const onRemove = (material: Material) => {
        setMaterialToRemove(material);
        setConfirmationPopup(true);
        switchControlBtnState(removeBtnRef.current);
        setCurrentMode(Mode.default);
    };

    const onEdit = (material: Material) => {
        setEditContent(material);
        setMaterialPopup(true);
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
                        setEditMode(false);
                        setRemovalMode(false);
                        setEditContent(null);
                        setMaterialPopup(true);
                        switchMode(Mode.add, currentMode, setCurrentMode);
                    },
                    Remove: (e) => {
                        handleModeToggle(
                            Mode.remove, 
                            removalMode, 
                            setRemovalMode,
                            e?.currentTarget,
                            removeBtnRef,
                            currentMode,
                            setCurrentMode
                        );
                    },
                    Edit: (e) => {
                        handleModeToggle(
                            Mode.edit,
                            editMode,
                            setEditMode,
                            e?.currentTarget,
                            editBtnRef,
                            currentMode,
                            setCurrentMode
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
                    {sortedMaterials
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

            {materialPopup && (
                <Popup ref={materialPopupRef}>
                    <MaterialsPopup
                        popupRef={materialPopupRef}
                        onSubmitSuccess={() => {
                            fetchAndSetMaterials(setMaterials);
                            exitEditModeIfActive();
                        }}
                        content={editContent}
                        onCancel={() => {
                            setMaterialPopup(false)
                            exitEditModeIfActive();
                        }} />
                </Popup>
            )}
            {confirmationPopup && (
                <Popup ref={confirmationPopupRef}>
                    <ConfirmationPopup
                        onSubmitSuccess={() => {
                            if (materialToRemove) {
                                handleSubmitRemoval(materialToRemove.id);
                            }
                            handleCloseConfirmation();
                        }}
                        content={`Remove "${materialToRemove?.name}"?`}
                        onCancel={handleCloseConfirmation}
                    />
                </Popup>
            )}
        </main>
    );
};

export default MaterialsPage;