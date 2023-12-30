import { db } from "../firebase";
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";

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
    async getAssignmentById(id: number): Promise<AssignmentSchema | null> {
        const docRef = doc(db, "assignments", id.toString());
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
}

const AssignmentsDB = new AssignmentsDatabase();
export default AssignmentsDB;

// ============ OBJECT TYPE DEFINITIONS ============ //

export type AssignmentSchema = {
    aid: string,
    aname: string,
    cid: string,
    uid: string,
    cname: string,
    dueDate: string
}