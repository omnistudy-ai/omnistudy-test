// Package imports
import { ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Course.css";
import { useNavigate } from "react-router-dom";
import { Box, Card } from "@mui/material";
import {MoreVert} from '@mui/icons-material'
import './style.css'

// import { Title } from "components/title";y




// import { HeadTableCell } from "./styles"; // STYLED COMPONENTS


// Utility imports
import CoursesDB, { CourseSchema } from "../../../../../tools/db/Courses";

export default function CourseNotes() {
    const [showMoreMenu, setShowMoreMenu] = useState<boolean>(false);
    function moreHandler(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
        e.preventDefault();
        setShowMoreMenu(!showMoreMenu);
    }



    // Get URL parameters
    // cid: course ID
    const params = useParams<ParamsType>();

    // Store the course data
    const [courseData, setCourseData] = useState<CourseSchema | null>(null);

    // Navigation hook
    const navigate = useNavigate();

    useEffect(() => {
        // Make sure course ID is present
        if(params.cid) {
            // Get the course data
            console.log(params.cid);
            CoursesDB.getCourseById(params.cid).then((courseData) => {
                // Check if the course exists, else redirect to 404
                if(courseData) 
                    setCourseData(courseData);
                else 
                    navigate("/404");
            });
        }
    }, [navigate, params.cid]); 

interface FlexBetweenProps{
    children: ReactNode,
    mb?: number
}

const FlexBetween: React.FC<FlexBetweenProps> = ({ children, ...props }) => (
    <Box display="flex" alignItems="center" justifyContent="space-between" {...props}>
        {children}
    </Box>
);




    return(
            <>
                  <div className="text-left border-b-[1px] border-stone-300 px-5 py-4 bg-stone-100 flex items-center">
        <span className="text-4xl font-bold mr-auto text-stone-600">Your Notes</span> </div>
            <Card sx={{
                padding: 3,
                pb:0,
                position: 'relative'
            }}>
                <FlexBetween mb={4}>
                    <Box>
                    <h4 className="text-xl font-semibold mb-2">Recently Opened Notes</h4>

                    </Box>
                    {/* notes.map */}
                </FlexBetween>
                <MoreVert className="text-black absolute top-3 right-3" onClick={(e) => moreHandler(e)}></MoreVert>

                {showMoreMenu && <div className="absolute top-3 right-3">
                    {/* triangle pointer */}
                    <div className="absolute top-[20px] left-[-22px] w-0 h-0 border-[10px] border-l-transparent border-r-transparent border-t-transparent border-b-white"></div>
                    {/* menu items */}
                    <div className="absolute top-[40px] translate-x-[-60%] bg-white rounded-md shadow-md z-40">
                        <div className="p-2 w-full h-full">
                            <div className="flex flex-row gap-x-2 p-1 rounded-md hover:bg-black transition duration-100 cursor-pointer">
                                {/* <ImageOutlined className="text-stone-400 cursor-pointer"></ImageOutlined> */}
                                <input type="file" className="hidden" id="menu-file" accept="image/*"  />
                                {/* <input type="file" className="hidden" id="menu-file" accept="image/*" onChange={(e) => onFileUpload(e)} /> implement functions for notes */}

                                {/* <input className="text-stone-400 font-bold cursor-pointer" type="button" value={thumbnailUrl === "" ? "Upload Thumbnail" : "Remove Thumbnail"} onClick={(e) => openFileInput(e)} /> */}

                                <input className="text-stone-400 font-bold cursor-pointer" type="button"  />
                            </div>
                            <div 
                                className="flex flex-row gap-x-2 p-1 rounded-md hover:bg-stone-100 transition duration-100 cursor-pointer"
                            >
                                {/* <PaletteOutlined className="text-stone-400 cursor-pointer"></PaletteOutlined> */}
                                <input 
                                    id="menu-color"
                                    // type="color" value={color} onChange={onColorChange} onBlur={onColorSave} 
                                />
                                <span className="text-stone-400 font-bold">Change Color</span>  
                            </div>  
                            <div 
                                className="flex flex-row gap-x-2 p-1 rounded-md hover:bg-stone-100 transition duration-100 cursor-pointer"
                                // onClick={(e) => deleteCourse(e)}
                            >
                                {/* <DeleteOutline className="text-stone-400 hover:text-rose-500"></DeleteOutline> */}
                                <span className="text-stone-400 font-bold hover:text-rose-500">Delete Course</span>
                            </div>
                        </div>
                    </div>
                </div>}

                <h1>

                </h1>
            </Card>
            {/* <Card sx={{
                padding: 3,
                pb: 0,
                position: 'relative'
            }}
            >

            </Card> */}
                

            </>
            
        
        
       
    )
}

// --------- OBJECT TYPE DEFINITIONS --------- //

// Define the type of the URL parameters
type ParamsType = {
    cid: string
}

