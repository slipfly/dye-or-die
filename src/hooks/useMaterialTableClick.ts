import { useEffect } from "react";
import { Mode } from "../const/const";
import { Material } from "../types/types";

export const useMaterialTableClick = (
    tbodyRef: React.RefObject<HTMLTableSectionElement | null>,
    currentMode: string | undefined,
    materials: Material[],
    onRemove: (material: Material) => void,
    onEdit: (material: Material) => void
) => {
    useEffect(() => {
        const tbody = tbodyRef.current;
        if (!tbody) return;

        const handleTableClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const row = target.closest('tr');
            if (!row || !row.id) return;

            const material = materials.find(mat => mat.id === row.id);
            if (!material) return;

            switch (currentMode) {
                case Mode.remove:
                    onRemove(material)
                    break;

                case Mode.edit:
                    onEdit(material)
                    break;

                default:
                    break;
            }
        }

        tbody.addEventListener('click', handleTableClick);

        return () => {
            tbody.removeEventListener('click', handleTableClick);
        };
    }, [materials, currentMode]);
};
