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

function SummarizationModal(props: SummarizationModalProps) {

    const [title, setTitle] = useState<string>("Ready to chat");
    const [loading, setLoading] = useState<boolean>(false);
    const [messageOut, setMessageOut] = useState<string>("");
    const [messages, setMessages] = useState<{ message: string, sender: string }[]>([{
        message: "Hello! What can I help you with?",
        sender: "server"
    }]);

    function handleSubmit() {
        setTitle("Processing request...");
        setLoading(true);
        setMessages([...messages, { message: messageOut, sender: "user" }]);
        const question = messageOut;
        setMessageOut("");
        axios.post("https://api.omnistudy.io/gpt", {
            doc_paths: props.selectedDocuments,
            question: question,
        }).then((response) => {
            console.log(response.data.result.data.answer);
            setTitle("Ready to chat");
            setLoading(false);
            setMessages([...messages, { message: question, sender: "user"}, { message: response.data.result.data.answer, sender: "server" }]);
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

                    {<TEModalBody className="flex flex-col gap-y-4">
                        <div className="h-[400px] overflow-y-scroll flex flex-col pr-2">
                            {messages.map((message) => {
                                console.log(messages);
                                return <div className={`flex flex-col gap-y-1 ${message.sender === "server" ? "text-left" : "text-right"}`}>
                                    <span className="text-xs text-stone-400">{message.sender === "server" ? "Omnihelper" : "You"}</span>
                                    <span className="text-sm">{message.message}</span>
                                </div>
                            })}
                        </div>
                    </TEModalBody>}

                    <TEModalFooter>
                        <div className="flex flex-row w-full">
                            <input 
                                type="text" 
                                className="text-sm border-1 border-gray-300 bg-stone-100 rounded-md w-full"
                                placeholder="Send a message"
                                value={messageOut}
                                onChange={(event) => setMessageOut(event.target.value)}
                            />

                            <button
                                className="ml-1 inline-block rounded bg-cyan-600 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                                onClick={() => handleSubmit()}
                            >
                                Send
                            </button>
                        </div>
                    </TEModalFooter>
                </TEModalContent>
            </TEModalDialog>
        </TEModal>
    );
}

export default SummarizationModal;

// ---------- TYPE DEFINITIONS ---------- //
type SummarizationModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    selectedDocuments: string[];
}