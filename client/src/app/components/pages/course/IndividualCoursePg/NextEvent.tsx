import { useState, useEffect } from 'react'
import EventsDB, { EventSchema} from '../../../../../tools/db/Events'
import { Timestamp } from 'firebase/firestore';



type PropsType = {
    courseId: string;
  };
export const NextEvent = ({courseId}:PropsType) => {
    const [event, setEvent] = useState<EventSchema[]>([])

    useEffect(() => {
        EventsDB.getEventForCourse(courseId)
          .then((data) => {
            console.log("Fetched Data: ", data); // Log the fetched data
    
            // Update the state with the fetched data
            setEvent(data);
          })
          .catch(error => {
            console.error("Failed to fetch Event: ", error);
          });
      }, [courseId]);

      return (
        <div className='p-4 max-w-full'>
            <h2 className='text-xl font-semibold mb-2'>Next Scheduled Event</h2>
            <div className='space-y-3'>
                {event.map((event) =>(
                    <div key={event.id} className='flex flex-row justify-between py-1 ml-50 bg-white shadow-md rounded-md p-4'>
                        <h3 className='text-lg font-bold'>{event.name}</h3>

                        <p className='text-sm text-gray-600 pl-50'>
                            Scheduled: {
                                event.date 
                                ? (event.date instanceof Timestamp
                                    ? event.date.toDate().toLocaleDateString()
                                    : new Date(event.date).toLocaleDateString())
                                    : "No Scheduled Date"
                            }
                        </p>
                        <p className='text-sm text-gray-600'>Starts on: {event.startTime}</p>
                        </div>

                ))}
            </div>
        </div>
      )


}

 
export default NextEvent;