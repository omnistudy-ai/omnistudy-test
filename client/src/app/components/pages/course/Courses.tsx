import CoursesDB from "../../../../tools/db/Courses";

export default function Courses() {

    async function createNewCourse() {
        const newCourse = {
            id: "12312",
            name: "New Course",
            assignments: [],
            notes: []
        }
        CoursesDB.addCourseForUser("lC1aLeZPAJR50Bb3O0vE3BgH0Ti2", newCourse);
    }

    return(
        <div>
            App Side - Courses
            <button onClick={() => createNewCourse()}>Add New Course</button>
        </div>
    );
}