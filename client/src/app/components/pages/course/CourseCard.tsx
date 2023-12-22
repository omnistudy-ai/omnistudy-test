import { useState, useEffect } from "react";

function CourseCard(props: CourseCardProps) {

    const [titleText, setTitleText] = useState<string>("");

    useEffect(() => {
        const joinedString = props.course.name + ": " + props.course.title;
        setTitleText(joinedString.length > 22 ? joinedString.substring(0, 22) + "..." : joinedString);
    }, []);

    return (
        <a href={`/app/courses/${props.course.id}`}>
            <div className="course-card bg-white rounded-md w-60 text-left shadow">
                <div className="image-color h-40 bg-cyan-400 rounded-t-md"></div>
                <div className="text-wrapper p-3">
                    <span className="text-md font-bold block text-cyan-400">{titleText}</span>
                    <span className="block text-sm text-stone-400">{props.course.professor}</span>
                    <span className="block text-sm text-stone-400">({props.course.startDate}) - ({props.course.endDate})</span>
                </div>
            </div>
        </a>
    );
}

export default CourseCard;

// ------------ TYPE DEFINITIONS ------------ 
type CourseCardProps = {
    course: {
        id: string,
        name: string,
        title: string,
        startDate: string,
        endDate: string,
        professor: string,
        room: string,
    }
}