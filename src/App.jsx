import { MainRoutes } from "./routes/MainRoutes";
import { MarqueeBar } from "./components/MarqueeBar/MarqueeBar";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from "./components/Footer/Footer";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="marquee-bar">
        <MarqueeBar />
      </div>
      <NavBar />

      <div className="content">
        {/* Contenido de la página va aquí */}
        <MainRoutes />
      </div>

      <Footer />
    </div>
  );
}

export default App;
