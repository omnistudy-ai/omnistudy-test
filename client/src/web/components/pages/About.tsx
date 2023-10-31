import "./About.css";
import Navbar from '../nav/Navbar';

export default function About() {
    return (
        <div className="About">
            <Navbar />
            <h1>Learn more about the project!</h1>
            <p></p>
            
            <section className="project-overview">
            <h2>Project Overview</h2>
                <p>
                    At the heart of our mission is a dedication to revolutionizing the learning experience. 
                    We envision leveraging the power of technology to create unparalleled educational experiences 
                    that transcend traditional boundaries. Recognizing that learning is an ever-evolving journey, 
                    our platform is designed to facilitate effective and engaging education for everyone, anywhere.
                </p>
                <p>
                    As a critical part of the Google Student Developer Club at the University of Minnesota, we are committed to 
                    developing a platform that stand at the intersection of technology and education. The goals we hold are 
                    at the ethos of GSDC, aiming to deliver an unparalleled learning experience.
                </p>
            </section>
            <section className="project-goals">
                <h2>Our Goals</h2>
                <p>
                    Quality Education for All: We’re leveraging the collaborative spirit and technological experiences to create 
                    a learning environment where quality education is a must for all. Our platform is a testament to this, giving 
                    personalized educational journeys for all!
                </p>
                <p>
                    Economic Growth Through Learning: With the goal of aligning education with the evolving job market, our platform 
                    ensures that learners are equipped with the latest skills and knowledge. Our platform empowers students alike to 
                    be ahead of the curve, leading to an easy transition from academic pursuits to real careers.
                </p>
                <p>
                    Innovation in Education Infrastructure: At OmniStudy, we are at the forefront of educational innovation. Our site is
                     not just a tool but a sign of progress, showing cutting edge solutions that refine how knowledge is consumed.
                </p>

            </section>

            <section className="project-manager">
                <h2>Project Manager</h2>
                <img src="../blue-vape.png" alt="Image description" style={{ maxWidth: '50%', height: 'auto' }} />
                <p>
                    The man behind it all! Jamison Grudem, best described as a relentless innovator, known for his extraordinary visons.
                    He navigates the realms of unknown, mystifying everyone in his path. Grudem, is the architect of this educational experience
                    that captivates and inspires all.
                </p>
            </section>

            <section className="developers">
                <h2>Our Developers</h2>
                <p>Alec</p>
                <p>Owen</p>
                <p>Noah</p>
                <p>Abbaas</p>
                <p>Mohamed</p>
                <p>Konrad</p>
            </section>

            <section className="going-forward">
                <h2>Going Forward</h2>
                <p>We will go forward</p>
            </section>
        </div>
    );
}
