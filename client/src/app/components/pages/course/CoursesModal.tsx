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
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CourseModalEvent from "./CourseModalEvent";
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";
import AppAuth from "../../../../tools/Auth";
import EventsDB from "../../../../tools/db/Events";

function CoursesModal(props: CoursesModalProps) {

    // Keep track of form inputs
    const [courseNumber, setCourseNumber] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [professor, setProfessor] = useState("");
    const [roomNumber, setRoomNumber] = useState("");

    // Keep track of start date and datepicker visibility
    const [startDate, setStartDate] = useState(new Date());
    const [showStartDate, setShowStartDate] = useState(false);

    // Keep track of end date and datepicker visibility
    const [endDate, setEndDate] = useState(new Date());
    const [showEndDate, setShowEndDate] = useState(false);

    const [showScheduleDropdown, setShowScheduleDropdown] = useState(false);
    const [scheduleEvents, setScheduleEvents] = useState<Array<any>>([]);

    function newEventHandler(e: React.MouseEvent) {
        setScheduleEvents([...scheduleEvents, { 
            id: uuidv4(),
            rule: "repeat",
            days: [], 
            date: new Date(),
            startTime: "08:00", 
            endTime: "09:00"
        }]);
    }

    function courseModalSubmitHandler() {

        console.log(scheduleEvents);
        // const allEvents = EventsDB.generateEventsTimeline(startDate, endDate, scheduleEvents);
        // console.log("ALL EVENTS");
        // console.log(allEvents);

        // Check authentication
        const authData = AppAuth.getAuth();
        const uid = authData.user.uid;
        if(uid !== "") {

            // Generate a course id
            const cid = uuidv4();

            // Generate the course data
            const courseData = {
                id: cid,
                uid: uid, // get uid
                number: courseNumber,
                title: courseTitle,
                professor: professor,
                room: roomNumber,
                startDate: startDate,
                endDate: endDate,
                events: [],
                assignments: [],
                notes: [],
                thumbnail: "",
                color: ""
            };

            // Add the course to the database
            props.setCourses([...props.courses, courseData]);
            CoursesDB.addCourseForUser(uid, courseData);

            // Add all the events to the database
            const allTimelineEvents = EventsDB.generateEventsTimeline(startDate, endDate, scheduleEvents);
            console.log("ALL TIMELINE EVENTS");
            console.log(allTimelineEvents);
            for(let i = 0; i < allTimelineEvents.length; i++) {
                const event = allTimelineEvents[i];
                console.log("Adding event to db");
                console.log(event);
                EventsDB.addEventForCourse(cid, event);
            }

            // Close and reset the form
            props.setShow(false);
        }
    }

    return(
        <TEModal show={props.show} setShow={props.setShow}>
        <TEModalDialog centered>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Add a new course
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
            {/* <!--Modal body--> */}
            <TEModalBody className="flex flex-col gap-y-4">

                {/* Course id and title */}
                <div className="flex w-full gap-x-4">
                    <div className="flex flex-col text-left w-full">
                        <label className="text-sm ml-1">Course Number:</label>
                        <input 
                            type="text" 
                            className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                            placeholder="CSci 2021"
                            onChange={(e) => setCourseNumber(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col text-left w-full">
                        <label className="text-sm ml-1">Course Title:</label>
                        <input 
                            type="text" 
                            className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                            placeholder="Machine Architecture and Organization"
                            onChange={(e) => setCourseTitle(e.target.value)}
                        />
                    </div>
                </div>

                {/* Professor and Room */}
                <div className="flex w-full gap-x-4">
                    <div className="flex flex-col text-left w-full">
                        <label className="text-sm ml-1">Professor:</label>
                        <input 
                            type="text" 
                            className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:"
                            placeholder="Antonia Zhai"
                            onChange={(e) => setProfessor(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col text-left w-full">
                        <label className="text-sm ml-1">Room Number:</label>
                        <input 
                            type="text" 
                            className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                            placeholder="Smith 331"
                            onChange={(e) => setRoomNumber(e.target.value)}
                        />
                    </div>
                </div>

                {/* Start and end date pickers */}
                <div className="flex w-full gap-x-4 justify-center">
                    <div className="flex flex-col text-left w-full">
                        <label className="text-sm ml-1">Start Date:</label>
                        <Datepicker
                            options={datepickerOptions}
                            onChange={(date) => { setStartDate(date) }}
                            show={showStartDate}
                            setShow={setShowStartDate}
                        />
                    </div>
                    <div className="flex flex-col text-left w-full">
                        <label className="text-sm ml-1">End Date:</label>
                        <Datepicker
                            options={datepickerOptions}
                            onChange={(date) => { setEndDate(date) }}
                            show={showEndDate}
                            setShow={setShowEndDate}
                        />
                    </div>
                </div>

                {/* Schedule body */}
                <div className={`rounded-lg border-gray-300 border`}>
                    <div id="accordion-collapse" data-accordion="collapse">
                        <h2 className="border-gray-300" id="accordion-collapse-heading-1" onClick={() => setShowScheduleDropdown(!showScheduleDropdown)}>
                            <button 
                                type="button" 
                                className={`${showScheduleDropdown ? "rounded-t-lg" : "rounded-lg"} flex items-center justify-between w-full p-2 font-medium rtl:text-right text-stone-800 focus:ring-gray-200 dark:text-gray-400 hover:bg-gray-100 gap-3 !bg-stone-100 border-gray-300`}
                                data-accordion-target="#accordion-collapse-body-1" 
                                aria-expanded="true" 
                                aria-controls="accordion-collapse-body-1"
                            >
                                <span>Schedule</span>
                                <svg data-accordion-icon className={`w-3 h-3 shrink-0 ${showScheduleDropdown ? "" : "rotate-180"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                                </svg>
                            </button>
                        </h2>
                        {showScheduleDropdown && <div id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                            <div className="p-2 border-gray-200">

                                {/* New event and clear buttons */}
                                <div className="flex flex-row">
                                    <p
                                        className="mr-auto text-left text-sm text-cyan-600 cursor-pointer hover:underline"
                                        onClick={newEventHandler}
                                    >
                                        + New Event
                                    </p>
                                    <p
                                        className="text-left text-sm text-cyan-600 cursor-pointer hover:underline"
                                        onClick={() => setScheduleEvents([])}
                                    >
                                        Clear
                                    </p>
                                </div>

                                {/* Render all events */}
                                {scheduleEvents.map((event, i) => {
                                    return <CourseModalEvent
                                        key={event.id}
                                        datepickerOptions={datepickerOptions}
                                        event={event}
                                        scheduleEvents={scheduleEvents}
                                        setScheduleEvents={setScheduleEvents}
                                    />
                                })}
                            </div>
                        </div>}
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
                  onClick={() => courseModalSubmitHandler()}
                >
                  Add course
                </button>
              </TERipple>
            </TEModalFooter>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    );
}

export default CoursesModal;

// ---------- TYPE DEFINITIONS ---------- //
type CoursesModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    courses: Array<CourseSchema>;
    setCourses: (courses: Array<CourseSchema>) => void;
}

// Datepicker styling options
export const datepickerOptions = {
    todayBtn: false,
    clearBtn: false,
    datepickerClassNames: "date-picker",
    theme: {
        background: "",
        todayBtn: "",
        clearBtn: "",
        icons: "",
        text: "text-neutral-800 dark:text-neutral-200",
        disabledText: "",
        input: "bg-stone-100 dark:bg-stone-100 text-black",
        inputIcon: "",
        selected: "bg-cyan-600"
    }
};