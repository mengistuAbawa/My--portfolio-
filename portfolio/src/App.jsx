import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [addedProjectsCount, setAddedProjectsCount] = useState(0);

  return (
    <div className="min-h-screen bg-darker text-white">
      <Navbar />
      <main>
        <Hero />
        <About addedProjectsCount={addedProjectsCount} />
        <Projects onProjectCountChange={setAddedProjectsCount} />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;