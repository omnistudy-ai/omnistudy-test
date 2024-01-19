import { useState } from "react";
import Datepicker from "tailwind-datepicker-react";

function CourseModalEvent(props: CourseModalEventProps) {

    const [oneOffDate, setOneOffDate] = useState(new Date());
    const [showOneOffDate, setShowOneOffDate] = useState(false);
    const [showOneOffDatePicker, setShowOneOffDatePicker] = useState(false);
    const eventDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div key={props.event.id} className="flex flex-col gap-2 mr-auto p-2 border border-gray-300 mt-2 shadow rounded-lg">

            {/* Repeats selection and delete button */}
            <div className="flex flex-row">
                <input 
                    type="text" 
                    className="px-2 py-1 text-sm border-1 border-gray-300 bg-stone-100 rounded-md mr-2"
                    placeholder="Name"
                    onChange={(e) => {
                        let index = props.scheduleEvents.findIndex((ev) => ev.id === props.event.id);
                        props.scheduleEvents[index].name = e.target.value;
                    }}
                />
                <select 
                    className="rounded px-2 bg-stone-100 border-gray-300 mr-auto focus:border-gray-500 focus:ring-0"
                    onChange={(e) => {
                        setShowOneOffDate(e.target.value === "oneOff" ? true : false);
                        let index = props.scheduleEvents.findIndex((ev) => ev.id === props.event.id);
                        props.scheduleEvents[index].rule = e.target.value;
                    }}
                >
                    <option value="repeats">Repeats</option>
                    <option value="oneOff">One-off</option>
                </select>
                <button
                    type="button"
                    className="box-content rounded-none border-none hover:no-underline hover:opacity-75 hover:text-cyan-600 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={() => {
                        props.setScheduleEvents(props.scheduleEvents.filter((ev) => ev.id !== props.event.id));
                    }}
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
            </div>

            {/* Days selector */}
            <div className="grid grid-cols-7">
                {eventDays.map((day) => {
                    return !showOneOffDate ? <span
                        key={day}
                        className={`border border-gray-300 cursor-pointer hover:bg-cyan-500 duration-150 ${day in props.event.days ? "bg-cyan-500" : ""}`}
                        onClick={(e) => {
                            // if first time clicking day, add to event days list
                            if (!props.event.days.includes(day))
                                props.event.days.push((e.target as HTMLElement).innerHTML);
                            // if day exists in event days, remove it if already clicked
                            else {
                                if((e.target as HTMLElement).classList.contains("bg-cyan-500")) {
                                    let index = props.event.days.findIndex((d) => d === day);
                                    props.event.days.splice(index, 1);
                                }
                            }
                            props.setScheduleEvents([...props.scheduleEvents]);
                            (e.target as HTMLElement).classList.toggle("bg-cyan-500");
                            console.log(props.event.days);
                        }}
                    >{day}</span> : null
                })}
            </div>

            {/* (optional: one off date selector) + Start and end time */}
            <div className="flex flex-row w-full gap-x-4">
                {showOneOffDate && <div className="flex flex-col w-full">
                    <label className="text-left text-sm ml-1">Date</label>
                    <Datepicker
                        options={props.datepickerOptions}
                        onChange={(date) => { 
                            let index = props.scheduleEvents.findIndex((ev) => ev.id === props.event.id);
                            props.scheduleEvents[index].date = date;
                        }}
                        show={showOneOffDatePicker}
                        setShow={setShowOneOffDatePicker}
                    />
                </div>}
                <div className="flex flex-col w-full">
                    <label className="text-left text-sm ml-1">Start Time</label>
                    <input 
                        className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md focus:border-gray-500 focus:ring-0"
                        type="time" 
                        min="09:00" 
                        max="18:00"  
                        defaultValue="08:00"
                        step="60"
                        onChange={(e) => {
                            let index = props.scheduleEvents.findIndex((ev) => ev.id === props.event.id);
                            props.scheduleEvents[index].startTime = e.target.value;
                            props.setScheduleEvents([...props.scheduleEvents]);
                        }}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <label className="text-left text-sm ml-1">End Time</label>
                    <input 
                        className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                        type="time" 
                        min="09:00" 
                        max="18:00" 
                        defaultValue="09:00"
                        step="60"
                        onChange={(e) => {
                            let index = props.scheduleEvents.findIndex((ev) => ev.id === props.event.id);
                            props.scheduleEvents[index].endTime = e.target.value;
                            props.setScheduleEvents([...props.scheduleEvents]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default CourseModalEvent;


// ------------- TYPE DEFINITIONS ------------- //
type ScheduleEvent = {
    id: string,
    rule: string,
    days: string[],
    date?: Date,
    startTime: string,
    endTime: string,
    name: string
}
type CourseModalEventProps = {
    datepickerOptions: Object,
    event: ScheduleEvent,
    scheduleEvents: Array<ScheduleEvent>,
    setScheduleEvents: (events: Array<ScheduleEvent>) => void,
}