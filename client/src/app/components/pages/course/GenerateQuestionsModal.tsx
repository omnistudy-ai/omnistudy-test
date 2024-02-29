import { 
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter
} from "tw-elements-react";

import { useEffect, useState } from "react";
import axios from "axios";

function GenerateQuestionsModal(props: GenerateQuestionsModalProps) {

    useEffect(() => {
        setTitle("Generate questions");
        setLoading(false);
        setNumQuestions(10);
        setQuestionTypes([]);
        setQuestions([]);
    }, []);

    const [title, setTitle] = useState<string>("Generate questions");
    const [loading, setLoading] = useState<boolean>(false);
    const [numQuestions, setNumQuestions] = useState<number>(10);
    const [questionTypes, setQuestionTypes] = useState<string[]>([]);
    const [questions, setQuestions] = useState<{
        question: string,
        type: string,
        answer: string
        options?: {
            [key: string]: string
        }
    }[]>([]);

    function handleQuestionTypeChange(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target.checked) {
            setQuestionTypes([...questionTypes, event.target.value]);
        } else {
            setQuestionTypes(questionTypes.filter((type) => type !== event.target.value));
        }
    }

    function handleSubmit() {
        setTitle("Generating your questions...");
        setLoading(true);
        axios.post("https://api.omnistudy.io/qgen", {
            doc_paths: props.selectedDocuments,
            num_questions: numQuestions,
            question_types: questionTypes
        }).then((response) => {
            console.log(response.data.result.data.answer);
            setTitle("Your generated questions");
            setLoading(false);
            setQuestions(response.data.result.data.answer);
        }).catch((error) => {
            console.error(error);
            setLoading(false);
        })
    }

    return (
        <TEModal show={props.show} setShow={props.setShow}>
            <TEModalDialog centered>
                <TEModalContent>
                    <TEModalHeader>
                        {/* Modal title */}
                        <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                            {title}
                        </h5>
                        {/* <!--Close button--> */}
                        <button type="button" className="box-content rounded-none border-none hover:no-underline hover:opacity-75 hover:text-cyan-600 focus:opacity-100 focus:shadow-none focus:outline-none" onClick={() => props.setShow(false)} aria-label="Close" > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" > <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> </svg> </button>
                    </TEModalHeader>
                    {!loading && questions.length == 0 && <TEModalBody className="flex flex-col gap-y-4">
                        {/* Assignment title */}
                        <div className="flex w-full gap-x-4">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Question Set Name</label>
                                <input 
                                    type="text" 
                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                    placeholder="Testing Question Set"
                                />
                            </div>
                        </div>
                        {/* Number of questions */}
                        <div className="flex w-full gap-x-4">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Number of Questions</label>
                                <input 
                                    type="number" 
                                    className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                    placeholder="10"
                                    onChange={(event) => setNumQuestions(parseInt(event.target.value))}
                                />
                            </div>
                        </div>
                        {/* Question types */}
                        <div className="flex w-full gap-x-4">
                            <div className="flex flex-col text-left w-full">
                                <label className="text-sm ml-1">Question types</label>
                                <div className="flex flex-row gap-x-2 ml-4 items-center">
                                    <input
                                        type="checkbox"
                                        className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                        value="SHORT"
                                        onChange={handleQuestionTypeChange}
                                    />
                                    <label htmlFor="text-sm">Short Answer</label>
                                </div>
                                <div className="flex flex-row gap-x-2 ml-4 items-center">
                                    <input
                                        type="checkbox"
                                        className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                        value="MCQ"
                                        onChange={handleQuestionTypeChange}
                                    />
                                    <label htmlFor="text-sm">Multiple Choice</label>
                                </div>
                                <div className="flex flex-row gap-x-2 ml-4 items-center">
                                    <input
                                        type="checkbox"
                                        className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                        value="TOF"
                                        onChange={handleQuestionTypeChange}
                                    />
                                    <label htmlFor="text-sm">True or False</label>
                                </div>
                                <div className="flex flex-row gap-x-2 ml-4 items-center">
                                    <input
                                        type="checkbox"
                                        className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md"
                                        value="FITB"
                                        onChange={handleQuestionTypeChange}
                                    />
                                    <label htmlFor="text-sm">Fill In The Blank</label>
                                </div>
                            </div>
                        </div>
                    </TEModalBody>}

                    {loading && <TEModalBody className="flex flex-col gap-y-4">
                        {/* Body content */}
                        <div className="flex w-full gap-x-4 justify-center items-center p-6">
                            <div className="flex flex-col justify-center items-center">
                                {/* Render the loading icon */}
                                <div role="status" className="pb-4">
                                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>

                                <div>
                                    <p className="text-stone-400">Generating questions, this could take a while. Please do not reload or close this page.</p>
                                </div>
                            </div>
                        </div>
                    </TEModalBody>}

                    {!loading && questions.length > 0 && <TEModalBody className="flex flex-col gap-y-4">
                        {questions.map((question) => {
                            return <div className="text-left">
                                <p className="font-bold">
                                    {question.type == "TOF" && !question.question.includes("True or False") ? "True or False: " : ""}
                                    {question.type == "FITB" && !question.question.includes("Fill in the blank") ? "Fill in the blank: " : ""}
                                    {question.question}
                                </p>
                                <div className="flex flex-col ml-1 gap-y-1">
                                    {Object.entries(question.options ? question.options : {}).map((key) => {
                                        return <div className="text-left">
                                            <p>{key[0]}. {key[1]}</p>
                                        </div>
                                    })}
                                </div>
                                <p className="text-cyan-600 hover:underline" onClick={(e) => (e.target as HTMLElement).innerHTML = `${question.answer}`}>
                                    Show Answer
                                </p>
                            </div>
                        })}
                    </TEModalBody>}

                    {!loading && questions.length == 0 && <TEModalFooter>
                        <button
                            className="ml-1 inline-block rounded bg-cyan-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            onClick={() => handleSubmit()}
                        >
                            Generate
                        </button>
                    </TEModalFooter>}
                </TEModalContent>
            </TEModalDialog>
        </TEModal>
    );
}

export default GenerateQuestionsModal;

// ---------- TYPE DEFINITIONS ---------- //
type GenerateQuestionsModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    selectedDocuments: string[];
}