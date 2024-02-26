import Container from "../../UI/Container";
import "./Team.css";
import member from "../../../assets/OmniStudy-logo.png";

interface teamMember {
  image: any;
  name: string;
  position: string;
}

const team: teamMember[] = [
  {
    image: member,
    name: "Jamison grudem",
    position: "Founder & CEO",
  },
  {
    image: member,
    name: "Owen Kanzler",
    position: "Frontend",
  },
  {
    image: member,
    name: "Noah Schlorf",
    position: "Frontend",
  },
  {
    image: member,
    name: "Abbaas Muhamud",
    position: "Frontend",
  },
  {
    image: member,
    name: "Brady Higgins",
    position: "Backend",
  },
];

const Team = () => {
  return (
    <section className="team">
      <Container>
        <div className="team-content">
          <div className="team-text">
            <h3>
              Meet the Omnistudy team, <br /> masters of{" "}
              <span>innovation and excellence.</span>
            </h3>
            <p>
              With unparalleled expertise, our elite team of software developers
              consistently delivers cutting-edge solutions, setting the standard
              for innovation and excellence.
            </p>
          </div>
          <div className="team-grid">
            {team.map((t, i) => (
              <div className="team-member">
                <div className="member-img">
                  <img
                    src={t.image}
                    alt={t.name}
                    loading="lazy"
                    width="300px"
                    height="300px"
                  />
                </div>
                <div className="member-text">
                  <h6>{t.name}</h6>
                  <p>{t.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Team;
