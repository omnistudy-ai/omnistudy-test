import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition"
import MicIcon from '@mui/icons-material/Mic';
import "./SpeechToText.css";

export default function SpeechToText() {

    const {
        transcript,
        listening, 
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    if(!browserSupportsSpeechRecognition) {
        return <span>Browser does not support speech recognition</span>
    }

    const startListening  = () => SpeechRecognition.startListening({ continuous: true });

    function toggleRecording() {
        if(listening) {
            SpeechRecognition.stopListening();
        } else {
            startListening();
        }
    }

    return(
        <div className="speech-to-text">

            <div className="recording-container" onClick={toggleRecording}>
                <div className={`recording-circle-outer
                    ${listening ? 'recording' : ''}
                `}>
                    <div className="recording-circle-inner">
                        <MicIcon></MicIcon>
                    </div>
                </div>
                <div className="text">{listening ? "Stop" : "Start"} Recording</div>
            </div>

            <button onClick={resetTranscript}>Clear</button>
            <p>{transcript}</p>
        </div>
    )
}