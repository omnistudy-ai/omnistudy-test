import "./OmniStudy.css";

import WebStatic from "./web/WebStatic";
import WebApp from "./app/WebApp";
import { Routes, Route } from "react-router-dom";

function OmniStudy() {
  return (
    <div className="App">
      <Routes>
        {/* WebStatic refers to the static informational website */}
        <Route path="/*" element={<WebStatic />}></Route>
        {/* WebApp refers to the actual application of the platform */}
        <Route path="/app/*" element={<WebApp />}></Route>
      </Routes>
    </div>
  );
}

export default OmniStudy;
