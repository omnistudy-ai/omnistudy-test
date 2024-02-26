import { useEffect, useRef, useState } from "react";
import AppAuth from "../../../../tools/Auth";
import EventsDB, { EventSchema } from "../../../../tools/db/Events";
import UsersDB from "../../../../tools/db/Users";

function Schedule() {

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const times = [
        "12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", 
        "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", 
        "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", 
        "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"
    ];

    const scheduleRef = useRef<HTMLDivElement>(null);
    const tbodyRef = useRef<HTMLTableSectionElement>(null);
    const [events, setEvents] = useState<Array<ScheduleEvent>>([]);
    const [eventElementStyling, setEventElementStyling] = useState<Array<ScheduleEventWithStyling>>([]);

    function getEventStyling(scheduleEvent: ScheduleEvent) {
        const event = scheduleEvent.event;
        const startHour = parseInt(event.startTime.split(":")[0]);
        const startMinutes = parseInt(event.startTime.split(":")[1]);
        const endHour = parseInt(event.endTime.split(":")[0]);
        const endMinutes = parseInt(event.endTime.split(":")[1]);
        const eventDate = new Date(event.date);
        const hourRow = tbodyRef.current!.children[startHour * 2];
        const hourAndDayCell = hourRow.children[eventDate.getDay() + 1];

        const scheduleRect = scheduleRef.current!.getBoundingClientRect();
        const cellRect = hourAndDayCell.getBoundingClientRect();

        const eventStyling: ScheduleEventWithStyling = {
            event: scheduleEvent,
            styling: {
                top: (cellRect.top - scheduleRect.top) + (cellRect.height * (startMinutes / 30)),
                left: cellRect.left - scheduleRect.left,
                width: cellRect.width,
                height: cellRect.height * ((((endHour * 60.0) + endMinutes) - ((startHour * 60.0) + startMinutes)) / 60.0) * 2,
            }
        }
        return eventStyling;
    }

    async function getEvents() {
        // Get authentication and the current user
        const authData = AppAuth.getAuth();
        const uid = authData?.user.uid;
        if(uid) {
            // Store all events found for the user
            const allEvents: Array<ScheduleEvent> = [];
            // Get all courses for the user
            const allCourses = await UsersDB.getUserCourses(uid);
            // Create a promise for retrieving the events
            const eventRetrieval = new Promise((resolve, reject) => {
                if(allCourses != null) {
                    // Get all events ids for each course
                    allCourses.forEach(async (course) => {
                        const eventIds = course.events;
                        eventIds.forEach(async (eventId, i, arr) => {
                            // Get the event data
                            const event = await EventsDB.getEventById(eventId);
                            if(event != null) {
                                allEvents.push({ cnumber: course.number, cname: course.title, croom: course.room, event: event });
                                if(i == arr.length - 1) resolve(true);
                            }
                        })
                    });
                }
            });
            // Once the promise above resolves, update the events
            eventRetrieval.then((data) => {
                setEvents(allEvents);
            });
        }
    }

    // Run on first page load, get all event data for the user
    useEffect(() => {
        getEvents();
    }, []);

    // Run after events are updated, display each event visually on the calendar
    useEffect(() => {
        if(events.length) {
            const newEventElementStyling: Array<ScheduleEventWithStyling> = [];
            events.forEach((event) => {
                const eventStyling = getEventStyling(event);
                newEventElementStyling.push({ ...eventStyling });
            });
            setEventElementStyling(newEventElementStyling);
        }
    }, [events]);

    // // THIS FUNCTION IS WORKING: NEEDS TO BE MORE EFFICIENT AND NOT LAG THE BROWSER
    // function adjustEventSizes() {
    //     const newEventElementStyling: Array<EventStyling> = [];
    //     events.forEach((event) => {
    //         newEventElementStyling.push(addEvent(event));
    //     });
    //     setEventElementStyling(newEventElementStyling);
    // }
    // window.addEventListener("resize", adjustEventSizes);

    return(
        <div className="schedule relative" ref={scheduleRef}>

            {/* Automatically add events here */}
            {eventElementStyling.map((eventStyling) => {
                return <div style={{ ...eventStyling.styling }} className="rounded-md absolute bg-cyan-500 schedule-event text-left p-2 cursor-pointer hover:bg-cyan-600 duration-150 overflow-hidden">
                    <span className="text-white block text-md">{eventStyling.event.cnumber}: {eventStyling.event.event.name}</span>
                    <div className="flex flex-col">
                        <span className="text-white text-xs">{eventStyling.event.event.startTime} - {eventStyling.event.event.endTime}</span>
                        <span className="text-white text-xs">{eventStyling.event.croom}</span>
                    </div>
                </div>;
            })}

            {/* Text page header */}
            <div className="text-left border-b-[1px] border-stone-300 px-5 py-4 bg-stone-100 flex items-center">
                <span className="text-4xl font-bold mr-auto text-stone-600">Schedule</span>
            </div>

            {/* Calendar pagination selector */}
            <div className="flex justify-center align-center gap-x-5 p-4 border-b border-stone-300 hidden">
                {/* Left arrow button */}
                <button>Prev</button>

                {/* Main text */}
                <span className="text-2xl font-bold text-stone-600">September 2021</span>

                {/* Right arrow button */}
                <button>Next</button>
            </div>

            {/* Calendar day header and time */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="relative">
                        <th className="sticky top-0"></th>
                        {days.map((day) => {
                            return <th key={day}>{day}</th>
                        })}
                    </thead>
                    <tbody ref={tbodyRef}>
                        {times.map((time) => {
                            return <>
                                <tr key={time}>
                                    <td className="h-8 text-sm w-[6%]">{time}</td>
                                    <td className="border border-stone-300 w-[12%]"></td>
                                    <td className="border border-stone-300 w-[12%]"></td>
                                    <td className="border border-stone-300 w-[12%]"></td>
                                    <td className="border border-stone-300 w-[12%]"></td>
                                    <td className="border border-stone-300 w-[12%]"></td>
                                    <td className="border border-stone-300 w-[12%]"></td>
                                    <td className="border border-stone-300 w-[12%]"></td>
                                </tr>
                                <tr>
                                    <td className="h-8"><span className="invisible text-sm">_</span></td>
                                    <td className="border border-stone-300"></td>
                                    <td className="border border-stone-300"></td>
                                    <td className="border border-stone-300"></td>
                                    <td className="border border-stone-300"></td>
                                    <td className="border border-stone-300"></td>
                                    <td className="border border-stone-300"></td>
                                    <td className="border border-stone-300"></td>
                                </tr>
                            </>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Schedule;

// --------------- TYPE DEFINITIONS --------------- //
type ScheduleEvent = {
    cnumber: string,
    cname: string,
    croom: string,
    event: EventSchema,
}
type ScheduleEventWithStyling = {
    event: ScheduleEvent,
    styling: {
        top: number,
        left: number,
        width: number,
        height: number,
    }
}