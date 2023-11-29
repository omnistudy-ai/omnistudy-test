import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

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
}

const AssignmentsDB = new AssignmentsDatabase();
export default AssignmentsDB;

// ============ OBJECT TYPE DEFINITIONS ============ //

export type AssignmentSchema = {
    aid: number,
    aname: string,
    cid: number
}