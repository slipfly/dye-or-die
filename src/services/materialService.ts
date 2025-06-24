// src/services/materialService.ts
import { db } from "../utils/firebase";
import { Material } from "../types/types";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Database } from "../const/const";

export const fetchMaterials = async (): Promise<Material[]> => {
    const querySnapshot = await getDocs(collection(db, Database.materials));
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Material[];
};

export const deleteMaterial = async (id: string): Promise<void> => {
    await deleteDoc(doc(db, Database.materials, id));
};

export const updateMaterial = async (id: string, data: Partial<Material>) => {
    const docRef = doc(db, Database.materials, id);
    await updateDoc(docRef, data);
};

export const fetchAndSetMaterials = async (setMaterials: (data: Material[]) => void) => {
    try {            
        const data = await fetchMaterials();
        setMaterials(data);
    } catch (err) {
        console.error("Error fetching materials:", err);
    }
};