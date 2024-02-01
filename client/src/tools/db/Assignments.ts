import { db, storage } from "../firebase"; // Adjust the import path as needed
import { doc, getDoc, query, collection, where, getDocs, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

class AssignmentsDatabase {
    /**
     * Get an assignment by its ID.
     */
    async getAssignmentById(id: string): Promise<AssignmentSchema | null> {
        const docRef = doc(db, "assignments", id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            return docSnap.data() as AssignmentSchema;
        } else {
            return null;
        }
    }

    /**
     * Get all assignments for a given user.
     */
    async getAllAssignmentsForUser(uid: string): Promise<Array<AssignmentSchema>> {
        const q = query(collection(db, "assignments"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const assignments: Array<AssignmentSchema> = [];
        querySnapshot.forEach((doc) => {
            assignments.push(doc.data() as AssignmentSchema);
        });
        return assignments;
    }

    /**
     * Add a new assignment to Firestore under a specific course.
     */
    async addAssignment(cid: string, assignmentData: AssignmentSchema): Promise<void> {
        const assignmentRef = doc(db, "assignments", assignmentData.aid);
        await setDoc(assignmentRef, assignmentData);
        await updateDoc(doc(db, "courses", cid), {
            assignments: arrayUnion(assignmentData.aid)
        });
    }

    /**
     * Upload a file and update the assignment with its URL.
     */
    async uploadFileAndUpdateAssignment(assignmentId: string, file: File): Promise<void> {
        const storageRef = ref(storage, `assignments/${assignmentId}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(snapshot.ref);

        const assignmentRef = doc(db, "assignments", assignmentId);
        await updateDoc(assignmentRef, {
            fileUrl: fileUrl
        });
    }
}

const AssignmentsDB = new AssignmentsDatabase();
export default AssignmentsDB;

// ============ OBJECT TYPE DEFINITIONS ============ //

export type AssignmentSchema = {
    aid: string,
    aname: string,
    cid: string,
    uid: string,
    cnumber: string,
    cname: string,
    dueDate: Date,
    dueTime: string,
    notes: string,
    fileUrl?: string  // Optional field for file URL
};
