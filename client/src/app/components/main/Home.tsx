import "./Home.css";
import Navbar from '../nav/Navbar';

export default function Home() {
    return (
        <div className="homepage">
            <Navbar />
            <h1>Welcome to OmniStudy</h1>
            <p>Your one-stop platform for all your educational needs.</p>
        </div>
    );
}
