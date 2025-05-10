import { Container, Row, Col } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

export const Experience = () => {
  const experiences = [
    {
      title: "AI/ML Lead, CodeChef SCOE Chapter",
      date: "Dec 2022 - Apr 2025",
      points: [
        "Ran 3 workshops with 50+ participants each.",
        "Created 2 competition-level datasets for student projects.",
        "Mentored 10+ students on ML and Python and C++ development.",
      ],
    },
    {
      title: "Technical Support Intern, Prathamesh Energy Solutions",
      date: "Dec 2024 - Jan 2025",
      points: [
        "Managed technical queries and product deployment support for 10+ clients.",
        "Diagnosed and resolved 30+ software issues in the field.",
        "Documented user-facing bug reports and collaborated with 2 internal teams.",
      ],
    },
    {
      title: "AI Research Intern, NRG",
      date: "Aug 2024 - Sep 2024",
      points: [
        "Benchmarked 3 AI model evaluation strategies.",
        "Improved classification accuracy by 15% on internal datasets.",
        "Collaborated with 4-person team to identify system bottlenecks in distributed systems and information retrieval techniques.",
      ],
    },
  ];

  return (
    <section
      id="experience"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "60px 0",
        textAlign: "center",
      }}
    >
      <Container cladsName="exp-container text-center justify-content-center align-items-center">
        <h2 style={{ fontWeight: "bold", marginBottom: "40px" }}>Experience</h2>
        {experiences.map((exp, index) => (
          <Row key={index} style={{ marginBottom: "40px", textAlign: "left" }}>
            <Col md={{ span: 8, offset: 2 }}>
              <h4 style={{ fontWeight: "600", marginBottom: "10px" }}>{exp.title}</h4>
              <p style={{ fontStyle: "italic", color: "#aaa", marginBottom: "15px" }}>{exp.date}</p>
              <ul style={{ listStyle: "none", paddingLeft: "0" }}>
                {exp.points.map((point, idx) => (
                  <li key={idx} style={{ display: "flex", alignItems: "flex-start", marginBottom: "10px" }}>
                    <FaCheckCircle style={{ color: "#0f0", marginRight: "10px", marginTop: "4px" }} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
};
