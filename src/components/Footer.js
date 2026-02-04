import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.jpg";
import navIcon1 from "../assets/img/nav-icon1.svg";
import navIcon2 from "../assets/img/nav-icon2.png";
import navIcon3 from "../assets/img/nav-icon4.png";
import navIcon4 from "../assets/img/nav-icon3.png";
import navIcon5 from "../assets/img/googlecloud.svg";


export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col size={12} sm={6} className="text-center text-sm-start">
            <img src={logo} alt="Logo" style={{
              borderRadius: "50%",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              width: "120px",
              height: "120px",
              objectFit: "cover"
            }} />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/atharv-more-0498b524b/"><img src={navIcon1} alt="LinkedIn" /></a>
              <a href="https://x.com/atharvwxyz"><img src={navIcon2} alt="Facebook" /></a>
              <a href="https://github.com/iatharvmore"><img src={navIcon3} alt="GitHub" /></a>
              <a href="https://www.cloudskillsboost.google/public_profiles/6bd13164-9f08-490c-a230-ef71fd1c77c7"><img src={navIcon5} alt="Google Cloud" /></a>
              <a href="https://medium.com/@160324atharvmore"><img src={navIcon4} alt="Medium" /></a>
            </div>
            <p>Copyright 2026. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
