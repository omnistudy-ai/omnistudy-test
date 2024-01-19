import { useState, useEffect } from "react";
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";
import { MoreVert, ImageOutlined, DeleteOutline, PaletteOutlined } from "@mui/icons-material";
import { removeCourseThumbnail, uploadCourseThumbnail } from "../../../../tools/storage";
import AppAuth from "../../../../tools/Auth";

import { storage } from "../../../../tools/firebase";
import { getDownloadURL, ref } from "firebase/storage";

function CourseCard(props: CourseCardProps) {

    const [titleText, setTitleText] = useState<string>("");
    const dateRangeString = `${props.course.startDate.toLocaleString('default', { month: "short", day: "2-digit", year: "numeric" })} - ${props.course.endDate.toLocaleString('default', { month: "short", day: "2-digit", year: "numeric" })}`;

    const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>(props.course.thumbnail);
    const [color, setColor] = useState<string>(props.course.color === "" ? "#22d3ee" : props.course.color);

    useEffect(() => {
        const joinedString = props.course.number + ": " + props.course.title;
        setTitleText(joinedString.length > 22 ? joinedString.substring(0, 22) + "..." : joinedString);
    }, []);

    function moreHandler(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
        e.preventDefault();
        setShowMoreMenu(!showMoreMenu);
    }

    function openFileInput(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        e.preventDefault();
        // if a thumbnail exists, remove it
        if(thumbnailUrl !== "") {
            const uid = AppAuth.getAuth().user.uid;
            removeCourseThumbnail(uid, props.course.id).then((res) => {
                setThumbnailUrl("");
            }).catch((err) => {
                console.log(err);
            });
            setShowMoreMenu(false);
        }
        // if no thumbnail exists, open file input to upload one
        else {
            const fileInput = document.getElementById("menu-file");
            fileInput?.click();
        }
    }

    async function onFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.item(0);
        if(file) {
            const uid = AppAuth.getAuth().user.uid;
            uploadCourseThumbnail(uid, props.course.id, file).then((res) => {
                console.log(res);
                // update the thumbnail url
                getDownloadURL(ref(storage, res.url)).then((url) => {
                    setThumbnailUrl(url);
                });
                setShowMoreMenu(false);
            });
        }
    }

    function onColorChange(e: React.ChangeEvent<HTMLInputElement>) {
        setColor(e.target.value);
    }
    function onColorSave(e: React.FocusEvent<HTMLInputElement>) {
        setShowMoreMenu(false);
        if(color === props.course.color) return;
        CoursesDB.updateCourseColor(props.course.id, color);
    }

    async function deleteCourse(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.preventDefault();
        await CoursesDB.removeCourseForUser(AppAuth.getAuth().user.uid, props.course.id);
    }

    return (
        <a href={`/app/courses/${props.course.id}`}>
            <div className="course-card bg-white rounded-md w-60 text-left shadow relative">
                <div className={`image-color h-40 rounded-t-md`} style={{ backgroundColor: color }}>
                    {thumbnailUrl && <img src={thumbnailUrl} className="w-full h-full object-cover rounded-t-md" />}
                </div>
                <div className="text-wrapper p-3">
                    <span className={`block text-md font-bold`} style={{ color: color }}>{titleText}</span>
                    <span className="block text-sm text-stone-400">{props.course.professor}</span>
                    <span className="block text-sm text-stone-400">({dateRangeString})</span>
                </div>

                <MoreVert className="text-white absolute top-3 right-3" onClick={(e) => moreHandler(e)}></MoreVert>
                {/* more menu dropdown popup */}
                {showMoreMenu && <div className="absolute top-3 right-3">
                    {/* triangle pointer */}
                    <div className="absolute top-[20px] left-[-22px] w-0 h-0 border-[10px] border-l-transparent border-r-transparent border-t-transparent border-b-white"></div>
                    {/* menu items */}
                    <div className="absolute top-[40px] translate-x-[-60%] bg-white rounded-md shadow-md z-40">
                        <div className="p-2 w-full h-full">
                            <div className="flex flex-row gap-x-2 p-1 rounded-md hover:bg-stone-100 transition duration-100 cursor-pointer">
                                <ImageOutlined className="text-stone-400 cursor-pointer"></ImageOutlined>
                                <input type="file" className="hidden" id="menu-file" accept="image/*" onChange={(e) => onFileUpload(e)} />
                                <input className="text-stone-400 font-bold cursor-pointer" type="button" value={thumbnailUrl === "" ? "Upload Thumbnail" : "Remove Thumbnail"} onClick={(e) => openFileInput(e)} />
                            </div>
                            <div 
                                className="flex flex-row gap-x-2 p-1 rounded-md hover:bg-stone-100 transition duration-100 cursor-pointer"
                            >
                                <PaletteOutlined className="text-stone-400 cursor-pointer"></PaletteOutlined>
                                <input 
                                    id="menu-color"
                                    type="color" value={color} onChange={onColorChange} onBlur={onColorSave} 
                                />
                                <span className="text-stone-400 font-bold">Change Color</span>  
                            </div>  
                            <div 
                                className="flex flex-row gap-x-2 p-1 rounded-md hover:bg-stone-100 transition duration-100 cursor-pointer"
                                onClick={(e) => deleteCourse(e)}
                            >
                                <DeleteOutline className="text-stone-400 hover:text-rose-500"></DeleteOutline>
                                <span className="text-stone-400 font-bold hover:text-rose-500">Delete Course</span>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </a>
    );
}

export default CourseCard;

// ------------- TYPE DEFINITIONS ------------- //
type CourseCardProps = {
    course: CourseSchema
}