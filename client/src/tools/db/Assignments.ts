import { db } from "../firebase";
import { doc, getDoc, query, collection, where, getDocs, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

class AssignmentsDatabase {
    /**
     * Get an assignment by its ID.
     * 
     * Usage:
     *  import AssignmentsDB from "./path/to/file"
     *  const assignment = await AssignmentsDB.getAssignmentById(1);
     *  if(assignment)
     *     console.log(assignment.name);
     *  else {}
     * 
     * @param id - the id of the assignment
     * @returns the assignment object, or null if not found
     */
    async getAssignmentById(id: string): Promise<AssignmentSchema | null> {
        const docRef = doc(db, "assignments", id);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            const data = await docSnap.data();
            return data as AssignmentSchema;
        }
        else 
            return null;
    }

    /**
     * Get all assignments for a given user.
     * 
     * Usage:
     *  import AssignmentsDB from "./path/to/file"
     *  const assignments = await AssignmentsDB.getAllAssignmentsForUser("1");
     *  assignments.forEach(assignment => {
     *     console.log(assignments.name);
     *  });
     * 
     * @param uid - the id of the user
     * @returns a list of exam objects, or an empty list if none were found
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
     * @param cid The course id to add to
     * @param assignmentData The assignment data to add
     */
     async addAssignment(cid: string, assignmentData: AssignmentSchema): Promise<void> {
        const assignmentRef = doc(db, "assignments", assignmentData.aid);
        await setDoc(assignmentRef, assignmentData);
        updateDoc(doc(db, "courses", cid), {
            assignments: arrayUnion(assignmentData.aid)
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
    notes: string
}