import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { Collapse, Dropdown, initTE, } from "tw-elements";
import AppAuth from "../../../tools/Auth";

function NavbarNorth() {

    const navigate = useNavigate();

    useEffect(() => {
        initTE({ Collapse, Dropdown });
    }, []);

    function logoutHandler() {
        AppAuth.deauthorize();
        navigate("/login");
    }

    return(
    <>
        <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-cyan-500 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4 z-50">
            <div className="flex w-full flex-wrap items-center justify-between px-3">
                <div
                    className="!visible hidden flex-grow basis-[100%] justify-start items-center lg:!flex lg:basis-auto"
                    id="navbarSupportedContent1"
                    data-te-collapse-item
                >
                    <a
                        className="flex justify-center items-center p-2 text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                        href="/app/courses"
                    >
                        <img
                            src="/logo_blue.png"
                            style={{ height: "30px" }}
                            alt="TE Logo"
                            loading="lazy" 
                        />
                    </a>
                {/* <ul
                    className="list-style-none mr-auto flex flex-row pl-0 lg:flex-row"
                    data-te-navbar-nav-ref>
                    <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                    <a
                        className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400"
                        href="#"
                        data-te-nav-link-ref
                        >Dashboard</a>
                    </li>
                    <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                    <a
                        className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                        href="#"
                        data-te-nav-link-ref
                        >Team</a>
                    </li>

                    <li className="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                    <a
                        className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                        href="#"
                        data-te-nav-link-ref
                        >Projects</a>
                    </li>
                </ul> */}
                </div>


                <div className="relative flex items-center">
                <div
                    className="relative hidden"
                    data-te-dropdown-ref
                    data-te-dropdown-alignment="end">

                    <a
                    className="hidden-arrow mr-4 flex items-center text-neutral-600 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="#"
                    id="dropdownMenuButton1"
                    role="button"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false">

                    <span className="[&>svg]:w-5">
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5">
                        <path
                            fillRule="evenodd"
                            d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                            clipRule="evenodd" />
                        </svg>
                    </span>

                    <span
                        className="absolute -mt-4 ml-2.5 rounded-full bg-danger px-[0.35em] py-[0.15em] text-[0.6rem] font-bold leading-none text-white"
                        >1</span>
                    </a>

                    <ul
                    className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenuButton1"
                    data-te-dropdown-menu-ref>

                    <li>
                        <a
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                        href="#"
                        data-te-dropdown-item-ref
                        >Action</a>
                    </li>
                    <li>
                        <a
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                        href="#"
                        data-te-dropdown-item-ref
                        >Another action</a>
                    </li>
                    <li>
                        <a
                        className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                        href="#"
                        data-te-dropdown-item-ref
                        >Something else here</a>
                    </li>
                    </ul>
                </div>

                <div
                    className="relative"
                    data-te-dropdown-ref
                    data-te-dropdown-alignment="end">
                    <a
                    className="hidden-arrow flex items-center whitespace-nowrap transition duration-150 ease-in-out motion-reduce:transition-none"
                    href="#"
                    id="dropdownMenuButton2"
                    role="button"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false">
                    <img
                        src="/blankAvatar.jpeg"
                        className="rounded-full"
                        style={{ height: "25px", width: "25px" }}
                        alt=""
                        loading="lazy" />
                    </a>

                    <ul
                    className="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenuButton2"
                    data-te-dropdown-menu-ref>

                    {/* <li>
                        <a
                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            href="#"
                            data-te-dropdown-item-ref
                        >Action</a>
                    </li>
                    <li>
                        <a
                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            href="#"
                            data-te-dropdown-item-ref
                        >Another action</a>
                    </li> */}
                    <li>
                        <a
                            className="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-white/30"
                            href="#"
                            data-te-dropdown-item-ref
                            onClick={logoutHandler}
                        >
                            Logout
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </nav>
    </>
    );
}

export default NavbarNorth;