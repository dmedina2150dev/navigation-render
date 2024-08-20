import "./App.css";
import Route from "./components/Route";
import { Router } from "./components/Router";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <h1>Navigation</h1>
      <Router>
        <Route name="main" Component={<Home />} />
        <Route name="about" Component={<About />} />
      </Router>
    </>
  );
}

export default App;
