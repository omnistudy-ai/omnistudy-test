import { db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, query, collection, where, getDocs } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { CourseSchema } from "./Courses";

class EventsDatabase {
    /**
     * Get a event by its ID.
     * 
     * Usage:
     *  import EventsDB from "./path/to/file"
     *  const event = await EventsDB.getEventById(1);
     *  if(event)
     *     console.log(event.id);
     *  else {}
     * 
     * @param id The id of the event
     * @returns the event object, or null if not found
     */
    async getEventById(id: string): Promise<EventSchema | null> {
        const docRef = doc(db, "events", id.toString());
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
            const data = await docSnap.data();
            data.date = data.date.toDate();
            return data as EventSchema;
        }
        else 
            return null;
    }

    async getEventForCourse(courseId: string): Promise<Array<EventSchema>>{
        const q = query(collection(db, "events"), where("cid", "==", courseId));
        const querySnapshot = await getDocs(q);
        const events: Array<EventSchema> = [];
        querySnapshot.forEach((doc) => {
            events.push(doc.data() as EventSchema);
        })
        return events;
    }

    /**
     * Add a new event to Firestore under a specific course.
     * @param cid The course ID to add the event to.
     * @param eventData The event object to add to Firestore.
     */
    async addEventForCourse(cid: string, eventData: EventSchema): Promise<void> {
        const eventRef = doc(db, "events", eventData.id);
        await setDoc(eventRef, eventData);
        updateDoc(doc(db, "courses", cid), {
            events: arrayUnion(eventData.id)
        });
    }

    /**
     * Given a list of event compositions - one off events or repeating events with rules - generate
     * a timeline of events that includes all events matching the rules in `events`
     * 
     * @param startDate The start date of the timeline
     * @param endDate The end date of the timeline
     * @param events The list of event compositions to generate the timeline from
     */
    generateEventsTimeline(startDate: Date, endDate: Date, events: Array<EventCompositionSchema>): Array<EventSchema> {
        const allEvents: Array<EventSchema> = [];

        events.forEach((event) => {
            // find all repeating events between the start and end date
            if(event.rule == "repeat") {
                // find the first date that matches the rule
                let date = new Date(startDate);
                // add all repeating events to the timeline, if within start and end date
                while(date <= endDate) {
                    if(event.days.includes(date.toLocaleString('default', { weekday: "short" }))) {
                        allEvents.push({ 
                            id: uuidv4(),
                            date: new Date(date),
                            startTime: event.startTime,
                            endTime: event.endTime,
                            name: event.name
                        });
                    }
                    date.setDate(date.getDate() + 1);
                }
            }
            // add all one off dates to the timeline, if within start and end date
            else {
                if(event.date >= startDate && event.date <= endDate) {
                    allEvents.push({ 
                        id: uuidv4(),
                        date: event.date,
                        startTime: event.startTime,
                        endTime: event.endTime,
                        name: event.name
                    });
                }
            }
        })

        return allEvents.sort((a, b) => {
            if(a.date < b.date) return -1;
            else if(a.date > b.date) return 1;
            else return 0;
        });
    }
}

const EventsDB = new EventsDatabase();
export default EventsDB;

// ============ OBJECT TYPE DEFINITIONS ============ //

type EventCompositionSchema = {
    id: string,
    rule: string,
    days: string[],
    date: Date,
    startTime: string,
    endTime: string,
    name: string
}

export type EventSchema = {
    name: string,
    id: string,
    date: Date,
    startTime: string,
    endTime: string,
}