import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/pages/Home";

import { Details } from "./components/pages/Details";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route
          exact
          path="/details/:equipmentId"
          element={<Details></Details>}
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
