import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";

class CoursesDatabase {
    /**
     * Get a course by its ID.
     * 
     * Usage:
     *  import CoursesDB from "./path/to/file"
     *  const course = await CoursesDB.getCourseById(1);
     *  if(course)
     *     console.log(course.name);
     *  else {}
     * 
     * @param id - the id of the user
     * @returns the user object, or null if not found
     */
    async getCourseById(id: string): Promise<CourseSchema | null> {
        const docRef = doc(db, "courses", id.toString());
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            const data = await docSnap.data();
            return data as CourseSchema;
        }
        else 
            return null;
    }

    /**
     * Add a new course to Firestore under a specific user.
     * @param user The user object to add to Firestore.
     */
    async addCourseForUser(uid: string, courseData: CourseSchema): Promise<void> {
        console.log("Adding course to user: " + uid);
        console.log(courseData);
        const courseRef = doc(db, "courses", courseData.id);
        await setDoc(courseRef, courseData);
        updateDoc(doc(db, "users", uid), {
            courses: arrayUnion(courseData.id)
        });
    }
}

const CoursesDB = new CoursesDatabase();
export default CoursesDB;

// ============ OBJECT TYPE DEFINITIONS ============ //

export type CourseSchema = {
    id: string, 
    name: string,
    title: string,
    startDate: string,
    endDate: string,
    professor: string,
    room: string,
    owner: string,
    assignments: Array<number>,
    notes: Array<number>
}