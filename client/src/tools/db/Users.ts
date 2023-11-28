import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

import AssignmentsDB, { AssignmentSchema } from "./Assignments";
import CoursesDB, { CourseSchema } from "./Courses";

class UsersDatabase {
    /**
     * Get a user by their ID.
     * 
     * Usage:
     *  import UsersDB from "./path/to/file"
     *  const user = await UsersDB.getUserById(1);
     *  if(user)
     *     console.log(user.name);
     *  else {}
     * 
     * @param id - the id of the user
     * @returns the user object, or null if not found
     */
    async getUserById(id: string): Promise<UserSchema | null> {
        const docRef = doc(db, "users", id.toString());
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            const data = await docSnap.data();
            return data as UserSchema;
        }
        else 
            return null;
    }

        /**
     * Add a new user to Firestore.
     * @param user The user object to add to Firestore.
     */
    async addUser(user: UserSchema): Promise<void> {
        const userRef = doc(db, "users", user.id.toString());
        await setDoc(userRef, user);
    }
    
    /**
     * Get the assignment data of a user by their ID.
     * 
     * Usage:
     *  const assignments = await UsersDB.getUserAssignments(1);
     *  if(assignments)
     *   console.log(assignments);
     *  else {}
     * 
     * @param id - the id of the user
     * @returns the array of assignment ids of the user, or null if not found
     */
    async getUserCourses(id: string): Promise<Array<CourseSchema> | null> {
        const userData = await this.getUserById(id);
        if(userData) {
            const courseData: Array<CourseSchema> = [];
            for(let i = 0; i < userData.courses.length; i++) {
                const courseObject = await CoursesDB.getCourseById(userData.courses[i].toString());
                if(courseObject)
                    courseData.push(courseObject);
            }
            return courseData;
        }
        else 
            return null;
    }

    /**
     * Get the course data of a user by their ID.
     * 
     * @param id 
     * @returns 
     */
    async getUserAssignments(id: string): Promise<Array<AssignmentSchema> | null> {
        const userData = await this.getUserById(id);
        if(userData) {
            const assignmentData: Array<AssignmentSchema> = [];
            for(let i = 0; i < userData.assignments.length; i++) {
                const assignmentObject = await AssignmentsDB.getAssignmentById(userData.assignments[i]);
                if(assignmentObject)
                    assignmentData.push(assignmentObject);
            }
            return assignmentData;
        }
        else 
            return null;
    }
}

export default new UsersDatabase();

// ============ OBJECT TYPE DEFINITIONS ============ //

type UserSchema = {
    id: string, 
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    courses: Array<number>,
    assignments: Array<number>
}