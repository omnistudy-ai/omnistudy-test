import { 
    TERipple,
    TEModal,
    TEModalDialog,
    TEModalContent,
    TEModalHeader,
    TEModalBody,
    TEModalFooter
} from "tw-elements-react";

import { CheckBadgeIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

function ServerStatusModal(props: ServerStatusModalProps) {
    return (
        <TEModal show={props.show} setShow={props.setShow}>
            <TEModalDialog centered>
                <TEModalContent>
                    <TEModalHeader>
                        {/* Modal title */}
                        <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                            {props.title}
                        </h5>
                        {/* <!--Close button--> */}
                        {(props.type === "success" || props.type === "error") && <button type="button" className="box-content rounded-none border-none hover:no-underline hover:opacity-75 hover:text-cyan-600 focus:opacity-100 focus:shadow-none focus:outline-none" onClick={() => props.setShow(false)} aria-label="Close" > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6" > <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> </svg> </button>}
                    </TEModalHeader>
                    <TEModalBody className="flex flex-col gap-y-4">
                        {/* Body content */}
                        <div className="flex w-full gap-x-4 justify-center items-center p-6">
                            <div className="flex flex-col justify-center items-center">
                                {/* Render the loading icon */}
                                {props.type === "loading" && <div role="status" className="pb-4">
                                    <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin dark:text-gray-600 fill-cyan-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>}

                                {/* Render the success icon */}
                                {props.type === "success" && <div role="status" className="pb-4">
                                    <CheckBadgeIcon className="h-24 text-green-400"></CheckBadgeIcon>
                                    <span className="sr-only">Success...</span>
                                </div>}

                                {/* Render the error icon */}
                                {props.type === "error" && <div role="status" className="pb-4">
                                    <ExclamationTriangleIcon className="h-24 text-red-500"></ExclamationTriangleIcon>
                                    <span className="sr-only">Error...</span>
                                </div>}

                                <div>
                                    <p className="text-stone-400">{props.message}</p>
                                </div>
                            </div>
                        </div>
                    </TEModalBody>
                </TEModalContent>
            </TEModalDialog>
        </TEModal>
    );
}

export default ServerStatusModal;

// ---------- TYPE DEFINITIONS ---------- //
type ServerStatusModalProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    type: "loading" | "success" | "error";
    title: string;
    message: string;
}