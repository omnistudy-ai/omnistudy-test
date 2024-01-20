import { db, storage } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

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
            data.startDate = data.startDate.toDate();
            data.endDate = data.endDate.toDate();
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

    /**
     * Remove a course from Firestore for a specific user.
     * @param uid The id of the user
     * @param cid The id of the course
     * @returns true if successful, false otherwise
     */
    async removeCourseForUser(uid: string, cid: string): Promise<boolean> {
        const courseRef = doc(db, "courses", cid);
        const userRef = doc(db, "users", uid);
        await updateDoc(userRef, {
            courses: arrayRemove(cid)
        });

        // get the course data
        const courseData = await this.getCourseById(cid);
        if(!courseData)
            return false;

        // Remove all events, assignments, and notes associated with this course
        for(let i = 0; i < courseData.events.length; i++) {
            const eventRef = doc(db, "events", courseData.events[i]);
            await deleteDoc(eventRef);
        }
        for(let i = 0; i < courseData.assignments.length; i++) {
            const assignmentRef = doc(db, "assignments", courseData.assignments[i]);
            await deleteDoc(assignmentRef);
        }
        for(let i = 0; i < courseData.notes.length; i++) {
            const noteRef = doc(db, "notes", courseData.notes[i]);
            await deleteDoc(noteRef);
        }

        // delete the storage bucket for this course
        const storageRef = ref(storage, `users/${uid}/${cid}`);
        await deleteObject(storageRef);

        // delete the course itself
        await deleteDoc(courseRef);
        return true;
    };

    async updateCourseColor(cid: string, color: string) {
        await updateDoc(doc(db, "courses", cid), {
            color: color
        });
    }

    generateBlankCourseSchema(): CourseSchema {
        return {
            id: "",
            number: "",
            title: "",
            professor: "",
            room: "",
            startDate: new Date(),
            endDate: new Date(),
            uid: "",
            events: [],
            assignments: [],
            notes: [],
            thumbnail: "",
            color: ""
        }
    }   
}

const CoursesDB = new CoursesDatabase();
export default CoursesDB;

// ============ OBJECT TYPE DEFINITIONS ============ //

export type CourseSchema = {
    id: string, 
    number: string,
    title: string,
    professor: string,
    room: string,
    startDate: Date,
    endDate: Date,
    uid: string,
    events: Array<string>,
    assignments: Array<string>,
    notes: Array<string>,
    thumbnail: string,
    color: string
}