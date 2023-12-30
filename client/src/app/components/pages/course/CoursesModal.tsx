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

function CoursesModal(props: CoursesModalProps) {

    const datepickerOptions = {
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
    const [startDate, setStartDate] = useState(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [showEndDate, setShowEndDate] = useState(false);

    const [showScheduleDropdown, setShowScheduleDropdown] = useState(false);

    const [scheduleEvents, setScheduleEvents] = useState<Array<any>>([]);
    const eventDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
                        />
                    </div>
                    <div className="flex flex-col text-left w-full">
                        <label className="text-sm ml-1">Course Title:</label>
                        <input 
                            type="text" 
                            className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                            placeholder="Machine Architecture and Organization"
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
                        />
                    </div>
                    <div className="flex flex-col text-left w-full">
                        <label className="text-sm ml-1">Room Number:</label>
                        <input 
                            type="text" 
                            className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                            placeholder="Smith 331"
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
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5 5 1 1 5"/>
                                </svg>
                            </button>
                        </h2>
                        {showScheduleDropdown && <div id="accordion-collapse-body-1" aria-labelledby="accordion-collapse-heading-1">
                            <div className="p-2 border-gray-200">
                                <div className="flex flex-row">
                                    <p
                                        className="mr-auto text-left text-sm text-cyan-600 cursor-pointer hover:underline"
                                        onClick={(e) => {
                                            if(scheduleEvents.length < 7)
                                                setScheduleEvents([...scheduleEvents, { days: [], startTime: "", endTime: "" }]);
                                            if(scheduleEvents.length >= 6)
                                                (e.target as HTMLElement).classList.add("!text-gray-300")
                                        }}
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
                                {scheduleEvents.map((event) => {
                                    return <div className="flex flex-col gap-2 mr-auto p-2 border border-gray-300 mt-2 shadow rounded-lg">
                                        {/* Days selector */}
                                        <div className="grid grid-cols-7">
                                            {eventDays.map((day) => {
                                                return <span
                                                    className={`border border-gray-300 cursor-pointer hover:bg-cyan-500 duration-150 ${day in event.days ? "bg-cyan-500" : ""}`}
                                                    onClick={(e) => {
                                                        (e.target as HTMLElement).classList.toggle("bg-cyan-500");
                                                        if (!(day in event.days))
                                                            event.days.push((e.target as HTMLElement).innerHTML);
                                                        setScheduleEvents([...scheduleEvents]);
                                                        console.log(event.days);
                                                    }}
                                                >{day}</span>
                                            })}
                                        </div>

                                        {/* Start and end time */}
                                        <div className="flex flex-row w-full gap-x-4">
                                            <div className="flex flex-col w-full">
                                                <label className="text-left text-sm ml-1">Start Time</label>
                                                <input 
                                                    type="text" 
                                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                                    placeholder="12:00 PM"
                                                    onChange={(e) => event.startTime = (e.target as HTMLInputElement).value}
                                                />
                                            </div>
                                            <div className="flex flex-col w-full">
                                                <label className="text-left text-sm ml-1">End Time</label>
                                                <input 
                                                    type="text" 
                                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                                    placeholder="12:00 PM"
                                                    onChange={(e) => event.startTime = (e.target as HTMLInputElement).value}
                                                />
                                            </div>
                                        </div>
                                    </div>
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
}