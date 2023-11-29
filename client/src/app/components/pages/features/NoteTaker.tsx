import "./NoteTaker.css";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import Markdown from "react-markdown";
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'


import EastIcon from '@mui/icons-material/East';
import SouthIcon from '@mui/icons-material/South';

import { useState } from "react";

export default function NoteTaker() {

    const [notes, setNotes] = useState<string>("# Type here to get started!");
    const [horizontal, setHorizontal] = useState<boolean>(false);

    function update(elem: string) {
        setNotes(elem);
    }

    function toggleOrientation() {
        setHorizontal(!horizontal);
        const content = document.querySelector(".note-taker .content") as HTMLElement;
        if(horizontal) {
            content.classList.add("horizontal");
            content.classList.remove("vertical");
        }
        else {
            content.classList.add("vertical");
            content.classList.remove("horizontal");
        }
    }

    return (
        <div className="note-taker">
            <div className="heading">
                <h1 contentEditable={true} suppressContentEditableWarning={true}>Untitled Notes</h1>
                <button onClick={toggleOrientation}>
                    {horizontal ? <SouthIcon/> : <EastIcon/>}
                </button>
            </div>
            <div className="content horizontal">
                <div className="type">
                    <CodeMirror
                        value={notes}
                        theme={vscodeDark}
                        onChange={(value) => update(value)}
                    />
                </div>
                <div className="render">
                    <Markdown 
                        children={notes}
                        remarkPlugins={[ remarkMath ]}
                        rehypePlugins={[ rehypeKatex ]}
                    />
                </div>
            </div>
        </div>
    )
}