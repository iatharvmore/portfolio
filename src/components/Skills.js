import { useState } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';

export const Skills = () => {
  const [activeTab, setActiveTab] = useState('languages');

  const skillCategories = {
    languages: {
      title: "Languages",
      skills: ["Python", "C++", "Java", "SQL"]
    },
    systems: {
      title: "Systems & Tools",
      skills: ["Unix/Linux", "Git", "TCP/IP", "Docker", "Bash"]
    },
    mlFrameworks: {
      title: "ML Frameworks",
      skills: ["TensorFlow", "PyTorch", "Scikit-learn"]
    },
    mlTools: {
      title: "ML Tools & MLOps",
      skills: ["MLflow", "FAISS", "Vector Search", "MLOps"]
    },
    webCloud: {
      title: "Web & Cloud",
      skills: ["React.js", "HTML", "CSS", "GCP", "MongoDB"]
    },
    devops: {
      title: "DevOps & APIs",
      skills: ["CI/CD", "REST APIs", "Secure API Design", "Data Storage (NoSQL/Relational)"]
    }
  };

  return (
    <section className="skill" id="skills">
      <Container>
        <Row>
          <Col xs={12}>
            <div className="skill-content">
              <h2>Skills</h2>
              <p>Organized list of technical skills categorized by domain and usage.</p>

              <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                <Nav variant="pills" className="skill-tabs">
                  {Object.entries(skillCategories).map(([key, category]) => (
                    <Nav.Item key={key}>
                      <Nav.Link eventKey={key}>{category.title}</Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>

                <Tab.Content className="skill-tab-content">
                  {Object.entries(skillCategories).map(([key, category]) => (
                    <Tab.Pane eventKey={key} key={key}>
                      <div className="skill-items">
                        {category.skills.map((skill, idx) => (
                          <div key={idx} className="skill-item">
                            <span className="skill-bullet">•</span>
                            <span className="skill-name">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Tab.Container>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
