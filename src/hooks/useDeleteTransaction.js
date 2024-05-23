import { db } from "../config/firebase-config"
import { deleteDoc, doc, getDoc } from "firebase/firestore"

export const useDeleteTransaction = () => {
    
    const deleteTransaction = async (id) => {
        try {
            const transactionDoc = doc(db, "transactions", id);
            await deleteDoc(transactionDoc);
        } catch (err) {
            console.error(err);
        }
    }
    
    return {deleteTransaction};
}