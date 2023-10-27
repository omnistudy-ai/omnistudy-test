// Package imports
import { useParams, useNavigate } from "react-router-dom";

export default function Exam() {

    // Get URL parameters
    // cid: course ID
    // eid: exam ID
    const params = useParams<ParamsType>();

    // TODO: Check to see if the assignment exists for the user
    // If it does not, redirect the user to the 404 page
    const navigate = useNavigate();

    return(
        <div>
            Assignment {params.eid} for Course {params.cid}
        </div>
    );
}

// --------- OBJECT TYPE DEFINITIONS --------- //

// Define the type of the URL parameters
type ParamsType = {
    cid: string,
    eid: string
}