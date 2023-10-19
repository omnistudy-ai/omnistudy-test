import './App.css';

import { AppAuth } from "./tools/Auth";

function App() {

  console.log(`authorized: ${AppAuth.getAuthorized()}`);
  AppAuth.setAuthorized(true);
  console.log(`authorized: ${AppAuth.getAuthorized()}`);

  return (
    <div className="App">
      OmniStudy Platform - Automatic Deploy From Branch Jamison

      <h1>AI Learning</h1>
      <h1>Transcriptions</h1>
      <h1>What else folks?</h1>
    </div>
  );
}

export default App;
