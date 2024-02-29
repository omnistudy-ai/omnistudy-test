import { 
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter
} from "tw-elements-react";
import Datepicker from "tailwind-datepicker-react";
import { useState, useEffect } from "react";
import AssignmentsDB, { AssignmentSchema } from "../../../../tools/db/Assignments";
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";
import { datepickerOptions } from "./CoursesModal";
import { v4 as uuidv4 } from "uuid";
import AppAuth from "../../../../tools/Auth";
import UsersDB from "../../../../tools/db/Users";

function AssignmentsModal(props: AssignmentsModalProps) {

    // Keep track of all courses
    const [courses, setCourses] = useState<Array<CourseSchema>>([]);

    // Keep track of form inputs
    const [assignmentName, setAssignmentName] = useState<string>("");
    const [assignmentCourse, setAssignmentCourse] = useState<CourseSchema>(CoursesDB.generateBlankCourseSchema()); 
    const [notes, setNotes] = useState<string>("");
    const [dueDate, setDueDate] = useState<Date>(new Date());
    const [showDueDate, setShowDueDate] = useState<boolean>(false);
    const [dueTime, setDueTime] = useState<string>("23:59");

    useEffect(() => {
        UsersDB.getUserCourses(AppAuth.getAuth()?.user.uid).then((courses) => {
            if(courses) setCourses(courses);
        });
    }, []);

    function assignmentModalSubmitHandler() {
        // User has to input assignment name and course
        if (assignmentName.trim() === "" || assignmentCourse.id === "") {
            alert("Please enter an assignment name and select a course.");
            return; // Stop the function execution
        }
        // Check authentication
        const authData = AppAuth.getAuth();
        const uid = authData.user.uid;
        if(uid !== "") {

            // Generate a course id
            const aid = uuidv4();

            console.log("due Date:");
            console.log(dueDate);
            console.log("dd mseconds:")
            console.log(dueDate.getTime());

            // Generate the assignment data
            const assignmentData = {
                aid: aid,
                aname: assignmentName,
                cid: assignmentCourse.id,
                uid: uid,
                cname: assignmentCourse.title,
                dueDate: dueDate.getTime(),
                dueTime: dueTime,
                notes: notes,
                cnumber: assignmentCourse.number,
                progress: 0,
                documents: []
            };

            // Add the course to the database
            props.setAssignments([...props.assignments, assignmentData]);
            AssignmentsDB.addAssignment(assignmentCourse.id, assignmentData);

            // Close and reset the form
            props.setShow(false);
            setAssignmentName("");
            setAssignmentCourse(CoursesDB.generateBlankCourseSchema());
            setNotes("");
            setDueDate(new Date());
            setShowDueDate(false);
            setDueTime("23:59");
        }
    }

    return(
        <TEModal show={props.show} setShow={props.setShow}>
            <TEModalDialog centered>
                <TEModalContent>
                    <TEModalHeader>
                        {/* <!--Modal title--> */}
                        <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                            Add a new assignment
                        </h5>
                        {/* <!--Close button--> */}
                        <button
                            type="button"
                            className="box-content rounded-none border-none hover:no-underline hover:opacity-75 hover:text-cyan-600 focus:opacity-100 focus:shadow-none focus:outline-none"
                            onClick={() => props.setShow(false)}
                            aria-label="Close"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                            >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                            </svg>
                        </button>
                    </TEModalHeader>
                    <TEModalBody className="flex flex-col gap-y-4">
                        {/* Assignment title */}
                        <div className="flex w-full gap-x-4">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Assignment Title</label>
                                <input 
                                    type="text" 
                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                    placeholder="Homework 1"
                                    onChange={(e) => setAssignmentName(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Assignment course */}
                        <div className="flex w-full gap-x-4">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Course</label>
                                <select
                                    className="px-3 py-2 text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                    onChange={(e) => {
                                        setAssignmentCourse(courses.find((course) => course.id === e.target.value) || CoursesDB.generateBlankCourseSchema());
                                    }}
                                >
                                    <option value="">Select a course</option>
                                    {courses.map((course) => {
                                        return <option key={course.id} value={course.id}>
                                            {course.number} - {course.title}
                                        </option>
                                    })}
                                </select>
                            </div>
                        </div>
                        {/* Assignment notes */}
                        <div className="flex w-full gap-x-4">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Notes</label>
                                <textarea
                                    className="px-3 py-2 text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                    cols={30} rows={3}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        {/* Start and end date pickers */}
                        <div className="flex w-full gap-x-4 justify-center">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Due Date</label>
                                <Datepicker
                                    options={datepickerOptions}
                                    onChange={(date) => { setDueDate(date) }}
                                    show={showDueDate}
                                    setShow={setShowDueDate}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="text-left text-sm ml-1">Due Time</label>
                                <input 
                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:border-gray-500 focus:ring-0"
                                    type="time" 
                                    defaultValue="23:59"
                                    step="60"
                                    onChange={(e) => { setDueTime(e.target.value); }}
                                />
                            </div>
                        </div>
                    </TEModalBody>
                    <TEModalFooter>
                        <TERipple rippleColor="light">
                            <button
                                type="button"
                                className="inline-block rounded bg-stone-200 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-cyan-700 transition duration-150 ease-in-out hover:bg-cyan-500 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                                onClick={() => props.setShow(false)}
                            >
                                Close
                            </button>
                        </TERipple>
                        <TERipple rippleColor="light">
                            <button
                                className="ml-1 inline-block rounded bg-cyan-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                onClick={() => assignmentModalSubmitHandler()}
                            >
                                Add assignment
                            </button>
                        </TERipple>
                    </TEModalFooter>
                </TEModalContent>
            </TEModalDialog>
        </TEModal>
    );
}

export default AssignmentsModal;

// ---------- TYPE DEFINITIONS ---------- //
type AssignmentsModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    assignments: Array<AssignmentSchema>;
    setAssignments: (assignments: Array<AssignmentSchema>) => void;
}