function FlushAccordion(props: FlushAccordionProps) {
    return(
        <div className="rounded-none border border-l-0 border-r-0 border-t-0 border-neutral-200 bg-white dark:border-neutral-600">
            <h2 className="mb-0" id={`flush-heading-${props.id}`}>
            <button
                className="group relative flex w-full items-center rounded-none border-0 bg-white p-4 text-left text-base text-neutral-800 transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none dark:bg-white dark:text-stone-500 [&:not([data-te-collapse-collapsed])]:bg-white [&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[&:not([data-te-collapse-collapsed])]:text-stone-500 dark:[&:not([data-te-collapse-collapsed])]:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]"
                type="button"
                data-te-collapse-init
                data-te-target={`#flush-collapse-${props.id}`}
                aria-expanded="false"
                aria-controls={`flush-collapse-${props.id}`}
            >
                {props.title}
                <span
                    className="-mr-1 ml-auto h-5 w-5 shrink-0 rotate-[-180deg] fill-[#336dec] transition-transform duration-200 ease-in-out group-[[data-te-collapse-collapsed]]:mr-0 group-[[data-te-collapse-collapsed]]:rotate-0 group-[[data-te-collapse-collapsed]]:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-[[data-te-collapse-collapsed]]:fill-white">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="h-6 w-6">
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                </span>
            </button>
            </h2>
            <div
            id={`flush-collapse-${props.id}`}
            className="!visible border-0"
            data-te-collapse-item
            data-te-collapse-show
            aria-labelledby={`flush-heading-${props.id}`}
            data-te-parent="#accordionFlushExample">
            <div className="px-5 py-4">
                {props.description}
            </div>
            </div>
        </div>
    );
}

export default FlushAccordion;

type FlushAccordionProps = {
    id: string,
    title: string,
    description: string
}