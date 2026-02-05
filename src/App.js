import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Experience } from "./components/Exp";
import { BackToTop } from "./components/BackToTop";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
