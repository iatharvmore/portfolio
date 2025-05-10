import { Container, Row, Col, Tab } from "react-bootstrap";
import colorSharp2 from "../assets/img/color-sharp2.png";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const projects = [
    {
      title: "Customer Satisfaction ML Pipeline",
      description: "Engineered an end-to-end ML system using ZenML and MLflow for analyzing 50k+ reviews. Improved F1-score by 15% with scalable pipeline design and cloud-ready tracking.",
      githubUrl: "https://github.com/iatharvmore/customer-satisfaction-pipeline"
    },
    {
      title: "Healthcare Predictive Platform",
      description: "Built a predictive system integrating 4 ML models to forecast hospital resource demand. Deployed for real-time inference in Unix-based distributed systems, cutting operational cost by 20%.",
      githubUrl: "https://github.com/iatharvmore/healthcare-predictive-platform"
    },
    {
      title: "NSFW Image Filter (Computer Vision)",
      description: "Developed an 85% accurate model for inappropriate image detection, deployed with real-time alerting and dashboard preview, optimized for low-latency, high-volume inference.",
      githubUrl: "https://github.com/iatharvmore/nsfw-image-filter"
    }
  ];

  // Inline styles
  const cardStyle = {
    textDecoration: "none",
    color: "inherit",
    transition: "transform 0.3s ease",
    display: "block",
    border: "1px solidrgb(223, 181, 247)",
    borderRadius: "12px",
    padding: "20px",
    height: "100%",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)"
  };

  const hoverStyle = {
    transform: "translateY(-5px)",
    backgroundColor: "#f8f9fa",
    boxShadow: "0 6px 25px rgba(0,0,0,0.1)"
  };

  const textCardStyle = {
    marginBottom: "10px"
  };

  const titleStyle = {
    color: "#222",
    marginBottom: "10px",
    fontWeight: "600",
    textAlign: "center",
  };

  const descriptionStyle = {
    fontSize: "14px",
    color: "#444"
  };

  const linkStyle = {
    display: "block",
    marginTop: "10px",
    fontSize: "13px",
    color: "#007bff",
    textAlign: "center",
  };

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Projects</h2>
                  <p>Highlighted AI/ML projects with focus on real-world deployment, performance optimization, and scalability.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {projects.map((project, index) => (
                            <Col key={index} md={4} className="mb-4">
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ ...cardStyle }}
                                onMouseOver={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
                                onMouseOut={(e) => Object.assign(e.currentTarget.style, cardStyle)}
                              >
                                <div style={textCardStyle}>
                                  <h5 style={titleStyle}>{project.title}</h5>
                                  <p style={descriptionStyle}>{project.description}</p>
                                  <span style={linkStyle}>View on GitHub →</span>
                                </div>
                              </a>
                            </Col>
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="decoration" />
    </section>
  );
};
