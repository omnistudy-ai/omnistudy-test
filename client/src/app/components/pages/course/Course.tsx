// Package imports
import { useParams, useNavigate } from "react-router-dom"

export default function Course() {

    // Get URL parameters
    // cid: course ID
    const params = useParams<ParamsType>();

    // TODO: Check to see if the course exists for the user
    // If it does not, redirect the user to the 404 page
    // const navigate = useNavigate();

    return(
        <div>
            Course {params.cid}
        </div>
    )
}

// --------- OBJECT TYPE DEFINITIONS --------- //

// Define the type of the URL parameters
type ParamsType = {
    cid: string
}