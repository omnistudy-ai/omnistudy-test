import { db, storage } from "../firebase"; 
import { doc, getDoc, query, collection, where, getDocs, setDoc, updateDoc, arrayUnion, deleteDoc, arrayRemove } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL} from "firebase/storage";

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
     * Get all assignments for a given course.
     */
       async getAllAssignmentsForCourse(courseId: string): Promise<Array<AssignmentSchema>> {
        try {
            const q = query(collection(db, "assignments"), where("cid", "==", courseId));
            const querySnapshot = await getDocs(q);
            const assignments: Array<AssignmentSchema> = [];
            querySnapshot.forEach((doc) => {
                assignments.push(doc.data() as AssignmentSchema);
            });
            return assignments;
        } catch (error) {
            console.error("Error fetching assignments: ", error);
            throw error; // or handle it as you see fit
        }
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
    async uploadFileAndUpdateAssignment(assignmentId: string, file: File): Promise<string> {
        const storageRef = ref(storage, `assignments/${assignmentId}/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(snapshot.ref);

        const assignmentRef = doc(db, "assignments", assignmentId);
        await updateDoc(assignmentRef, {
            documents: arrayUnion(fileUrl)
        });
        return fileUrl;
    }

    /**
     * Update the progress of an assignment.
     */
    async updateAssignmentProgress(aid: string, progress: number): Promise<void> {
        const assignmentRef = doc(db, "assignments", aid);
        await updateDoc(assignmentRef, {
            progress: progress
        });
    }
    /**
     * Deletes an assignment by its ID and removes it from the course's assignment list.
     */
    async deleteAssignment(aid: string, cid: string): Promise<void> {
        try {
            // Delete the assignment from the "assignments" collection
            await deleteDoc(doc(db, "assignments", aid));

            // Remove the assignment ID from the course's assignment list
            const courseRef = doc(db, "courses", cid);
            await updateDoc(courseRef, {
                assignments: arrayRemove(aid)
            });
        } catch (error) {
            console.error("Error deleting assignment: ", error);
            throw error; 
        }
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
    dueDate: number,
    dueTime: string,
    notes: string,
    progress: number,
    documents: string[]  // files
};
