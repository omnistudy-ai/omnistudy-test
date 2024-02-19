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
import ExamsDB,{ ExamSchema } from "../../../../tools/db/Exams";
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";
import { datepickerOptions } from "./CoursesModal";
import { v4 as uuidv4 } from "uuid";
import AppAuth from "../../../../tools/Auth";
import UsersDB from "../../../../tools/db/Users";

function ExamModal(props: ExamModalProps) {
    const [courses, setCourses] = useState<Array<CourseSchema>>([]);

    // Form inputs
    const [examName, setExamName] = useState<string>(""); //Module
    const [examCourse, setExamCourse] = useState<CourseSchema>(CoursesDB.generateBlankCourseSchema)
    const [examDate, setExamDate] = useState<Date>(new Date());
    const [examStartTime, setExamStartTime] = useState<Date>(new Date());
    const [examDuration, setExamDuration] = useState<number>(0);
    const [ExamRoom, setExamRoom] = useState<string>("");

    useEffect(()=>{
        UsersDB.getUserCourses(AppAuth.getAuth()?.user.uid).then((courses)=>{
            if (courses) setCourses(courses);
        })
    }, []);
    function examModalSubmitHandler(){
        // Check authentication
        const authData = AppAuth.getAuth();
        const uid = authData.user.uid;
        if (uid != "") {
            const eid = uuidv4();

            // exam data
            const examData = {
                eid: eid,
                name: examName,
                cid: examCourse.id,
                date: examDate,

            }

            
        }
    }

}

// ---------- TYPE DEFINITIONS ---------- //
type ExamModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    exams: Array<ExamSchema>;
    setExams: (exams: Array<ExamSchema>) => void;
}