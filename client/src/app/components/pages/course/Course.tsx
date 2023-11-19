// Package imports
import { useParams } from "react-router-dom";
import "./Course.css";

export default function Course() {

    // Get URL parameters
    // cid: course ID
    const params = useParams<ParamsType>();

    // TODO: Check to see if the course exists for the user
    // If it does not, redirect the user to the 404 page
    // const navigate = useNavigate();

    return(
        <div className="course-page">
            <div className="header">
                <h2 className="text">Course {params.cid}</h2>
            </div>
        </div>
    )
}

// --------- OBJECT TYPE DEFINITIONS --------- //

// Define the type of the URL parameters
type ParamsType = {
    cid: string,
}