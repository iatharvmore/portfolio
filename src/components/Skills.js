import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png";

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const skills = [
    {
      title: "Languages",
      items: ["Python", "C++", "Java", "SQL"]
    },
    {
      title: "Systems",
      items: ["Unix/Linux", "Git", "TCP/IP", "Docker", "Bash"]
    },
    {
      title: "ML Frameworks",
      items: ["TensorFlow", "PyTorch", "Scikit-learn"]
    },
    {
      title: "ML Tools",
      items: ["MLflow", "FAISS", "Vector Search", "MLOps"]
    },
    {
      title: "Web & Cloud",
      items: ["React.js", "HTML", "CSS", "GCP", "MongoDB"]
    },
    {
      title: "DevOps & APIs",
      items: ["CI/CD", "REST APIs", "Secure API Design", "Data Storage (NoSQL/Relational)"]
    }
  ];

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Skills</h2>
              <p>Organized list of technical skills categorized by domain and usage.</p>
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
  {skills.map((skillGroup, index) => (
    <div
      className="item"
      key={index}
      style={{ margin: '0 15px' }}  // Add horizontal spacing between cards
    >
      <div className="skill-card" style={{
        background: '#1f1f1f',
        padding: '20px',
        borderRadius: '10px',
        color: 'white',
        height: '100%',
        minHeight: '200px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
      }}>
        <h5 style={{ marginBottom: '10px' }}>{skillGroup.title}</h5>
        <ul style={{ listStyle: 'none', paddingLeft: 0, margin: 0 }}>
          {skillGroup.items.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '5px' }}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</Carousel>

            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Background" />
    </section>
  );
};
