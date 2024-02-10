import { db } from "../firebase";
import { collection, doc, getDoc,setDoc, query, where, getDocs, updateDoc, arrayUnion } from "firebase/firestore";

class ExamsDatabase {
    /**
     * Get an exam by its ID.
     * 
     * Usage:
     *  import ExamsDB from "./path/to/file"
     *  const exam = await ExamsDB.getExamById(1);
     *  if(exam)
     *     console.log(exam.name);
     *  else {}
     * 
     * @param id - the id of the exam
     * @returns the exam object, or null if not found
     */
    async getExamById(id: number): Promise<ExamSchema | null> {
        const docRef = doc(db, "exams", id.toString());
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            const data = await docSnap.data();
            return data as ExamSchema;
        }
        else 
            return null;
    }

    /**
     * Get all exams for a given user.
     * 
     * Usage:
     *  import ExamsDB from "./path/to/file"
     *  const exams = await ExamsDB.getAllExamsForUser("1");
     *  exams.forEach(exam => {
     *     console.log(exam.name);
     *  });
     * 
     * @param uid - the id of the user
     * @returns a list of exam objects, or an empty list if none were found
     */
    async getAllExamsForUser(uid: string): Promise<Array<ExamSchema>> {
        const q = query(collection(db, "exams"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        const exams: Array<ExamSchema> = [];
        querySnapshot.forEach((doc) => {
            exams.push(doc.data() as ExamSchema);
        });
        return exams;
    }

    /**
     * Add a new exam to Firestore under a specific course.
     */
    async addExam(cid: string, examData: ExamSchema): Promise<void> {
        const examRef = doc(db, "exams", examData.eid);
        await setDoc(examRef, examData);
        await updateDoc(doc(db, "exams", cid), {
            exams: arrayUnion(examData.eid)
        })
    }
}

const ExamsDB = new ExamsDatabase();
export default ExamsDB;

// ============ OBJECT TYPE DEFINITIONS ============ //

export type ExamSchema = {
    eid: string,
    name: string,
    cid: string,
    date: string
}