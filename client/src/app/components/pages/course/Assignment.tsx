import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CoursesDB, { CourseSchema } from "../../../../tools/db/Courses";
import AssignmentsDB, { AssignmentSchema } from "../../../../tools/db/Assignments";
import "./Assignment.css";
import { CloudArrowUpIcon, DocumentIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import ServerStatusModal from "./ServerStatusModal";
import ChatModal from "./ChatModal";
import SummarizationModal from "./SummarizationModal";
import GenerateQuestionsModal from "./GenerateQuestionsModal";

// Define the type of the URL parameters
type ParamsType = {
  cid: string;
  aid: string;
};

export default function Assignment() {
  const params = useParams<ParamsType>();
  const [progress, setProgress] = useState(0);
  const [courseData, setCourseData] = useState<CourseSchema | null>(null);
  const [assignmentData, setAssignmentData] = useState<AssignmentSchema | null>(null);
  const [assignmentDocuments, setAssignmentDocuments] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSummModal, setShowSummModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [modalProps, setModalProps] = useState<{
    title: string;
    message: string;
    type: "loading" | "success" | "error";
  }>({
    title: "Processing your document",
    message: "This may take a while depending on the size of your document. Please do not close or reload the page.",
    type: "loading",
  });
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  useEffect(() => {
    if (params.cid) {
      CoursesDB.getCourseById(params.cid).then((course) => {
        if (course) {
          setCourseData(course);
          AssignmentsDB.getAssignmentById(params.aid!).then((assignment) => {
            if (assignment) {
              setAssignmentData(assignment);
              setAssignmentDocuments(assignment.documents);
              setProgress(assignment.progress);
            }
          });
        }
      });
    }
  }, [params.cid, params.aid]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const progress = parseInt(event.target.value, 10);
    setProgress(progress);
    AssignmentsDB.updateAssignmentProgress(assignmentData!.aid, progress);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files!;
    console.log(files);
    if(files.length > 0) {
      for(let i = 0; i < files.length; i++) {
        const file = files[i];
        if (assignmentData) {
          setShowModal(true);
          setModalProps({
            title: "Processing your document",
            message: "This may take a while depending on the size of your document. Please do not close or reload the page.",
            type: "loading",
          });
          // File upload to Firebase
          AssignmentsDB.uploadFileAndUpdateAssignment(assignmentData.aid, file).then((url) => {
            setAssignmentDocuments([...assignmentDocuments, url]);
              setShowModal(true);
              setModalProps({
                title: "Document processed successfully",
                message: "The document was successfully processed. You can now close this modal.",
                type: "success",
              });
          // File upload failed
          }).catch((error) => {
            setShowModal(true);
            setModalProps({
              title: "An error occurred",
              message: "The file failed to upload. Please try again.",
              type: "error",
            });
          });
        }
      }
    }
  };

  function handleDocumentSelect(e: React.ChangeEvent<HTMLInputElement>, document: string) {
    if(e.target.checked) {
      setSelectedDocuments([...selectedDocuments, document]);
    }
    else {
      setSelectedDocuments(selectedDocuments.filter((doc) => doc !== document));
    }
  }

  function summarizeDocument() {
    setShowModal(true);
    setModalProps({
      title: "Summarizing document(s)",
      message: "This may take a while depending on the size of your document(s). Please do not close or reload the page.",
      type: "loading",
    });
    const url = "http://35.192.151.93:8000/summarize";
    axios.post(url, {
      doc_paths: selectedDocuments,
      length: 100
    }).then((result) => {
      setShowModal(true);
      setModalProps({
        title: "Document(s) summarized successfully",
        message: result.data.result.data.answer,
        type: "success",
      });
    }).catch((error) => {
      setShowModal(true);
      setModalProps({
        title: "Document(s) summarized successfully",
        message: error.message,
        type: "error",
      });
    });
  }

  function getFileNameFromFirebaseLink(url: string) {
    url = url.split('%2F').join('/').replaceAll('%20', ' ');
    const segments = url.split('/');
    const lastSegment = segments[segments.length - 1];
    const filename = lastSegment.split('?')[0];
    return filename.length > 15 ? `${filename.slice(0, 10)}... ${filename.slice(filename.length - 6, filename.length)}` : filename;
  }

  return (
    <div className="courses-content">

      <ServerStatusModal 
        show={showModal}
        setShow={setShowModal}
        {...modalProps}
      />
      
      <ChatModal
        show={showChatModal}
        setShow={setShowChatModal}
        selectedDocuments={selectedDocuments}
      />

      <SummarizationModal 
        show={showSummModal}
        setShow={setShowSummModal}
        selectedDocuments={selectedDocuments}
      />

      <GenerateQuestionsModal 
        show={showQuestionModal}
        setShow={setShowQuestionModal}
        selectedDocuments={selectedDocuments}
      />

      <div className="text-left px-5 py-4 bg-stone-100 flex items-center justify-between w-full">
        <span className="text-4xl font-bold text-stone-600">
          {courseData?.number}: {assignmentData?.aname}
        </span>
        <div className="relative" data-te-dropdown-ref>
          <button
            className="flex items-center whitespace-nowrap rounded !bg-cyan-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-cyan-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-600 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            type="button"
            id="dropdownMenuButton1"
            data-te-dropdown-toggle-ref
            aria-expanded="false"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            Interact
            <span className="ml-2 w-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5">
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </button>
          <ul
            className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
            aria-labelledby="dropdownMenuButton1"
            data-te-dropdown-menu-ref>
            <li>
              <a
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                href="#"
                data-te-dropdown-item-ref
                onClick={() => setShowChatModal(true)}
              >Chat</a>
            </li>
            <li>
              <a
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                href="#"
                data-te-dropdown-item-ref
                onClick={() => setShowSummModal(true)}
              >Summarization</a>
            </li>
            <li>
              <a
                className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                href="#"
                data-te-dropdown-item-ref
                onClick={() => setShowQuestionModal(true)}
              >Question Generation</a>
            </li>
          </ul>
        </div>
      </div>
      <div id="page-content" className="p-8 flex flex-row gap-x-6">

        <div className="flex flex-row gap-x-6">
          {/* Assginments details container */}
          <div className="flex flex-col bg-white shadow-md rounded-md text-left basis-1/5 h-fit">
            <div className="flex flex-col gap-x-6 gap-y-4 p-5">
              <div className="flex flex-col">
                <span className="text-stone-600 text-xl font-bold">{assignmentData?.aname}</span>
                <span className="text-stone-500">{courseData?.title}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-stone-600 text-xl font-bold">Due Date</span>
                {assignmentData && <span className="text-stone-500">{new Date(assignmentData.dueDate).toLocaleDateString('en-us', { weekday:"long", month:"short", day:"numeric" })}</span>}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-6 w-full">
            {/* Progress slider */}
            <div className="bg-white rounded-lg p-5 text-left">
              <div className="w-full">
                <div className="progress-label text-left">
                  <span className="text-stone-600"><strong>Progress:</strong> {progress}%</span>
                </div>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress}
                  className="slider w-full"
                  id="progressSlider"
                  onChange={handleSliderChange}
                  step={10}
                />
              </div>
            </div>
            {/* Assignment documents container */}
            <div id="documents" className="bg-white rounded-lg p-5">
              <div className="text-left text-2xl font-bold mb-2 text-stone-600">Documents</div>
              <div className="flex flex-row gap-x-6">
                <div className="flex flex-row flex-wrap gap-6">
                  <div className="flex flex-row">
                    <input className="hidden" type="file" onChange={handleFileUpload} multiple accept=".pdf" />
                    <div
                      className="flex flex-col border-2 border-dashed border-[#1AAECB] w-32 justify-center items-center py-4 rounded-md cursor-pointer"
                      // Open the file input by clicking on here
                      onClick={(e) => (document.querySelector('input[type="file"]') as HTMLInputElement).click()}
                    >
                      <div className="flex flex-col justify-center items-center">
                        <CloudArrowUpIcon className="w-14 h-20 text-[#1AAECB]"></CloudArrowUpIcon>
                        <p className="py-2 text-[#1AAECB]">Upload documents</p>
                      </div>
                    </div>
                  </div>

                  {assignmentDocuments.map((document) => {
                    return <div
                      className="relative flex flex-col bg-white shadow-md w-32 justify-center items-center py-4 rounded-md"
                    >
                      <input onChange={(e) => handleDocumentSelect(e, document)} key={document} type="checkbox" className="absolute top-3 left-3 ring-0 outline-0" />
                      <div className="flex flex-col justify-center items-center">
                        <DocumentIcon className="w-14 h-20 text-[#1AAECB]"></DocumentIcon>
                        <p className="py-2 text-[#1AAECB]">
                          <a href={document} target="_blank">{getFileNameFromFirebaseLink(document)}</a>
                        </p>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
