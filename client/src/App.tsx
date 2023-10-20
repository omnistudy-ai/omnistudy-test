import './App.css';

import { AppAuth } from "./tools/Auth";

function App() {

  console.log(`authorized: ${AppAuth.getAuthorized()}`);
  AppAuth.setAuthorized(true);
  console.log(`authorized: ${AppAuth.getAuthorized()}`);

  return (
    <div className="App">
      OmniStudy Platform - Automatic Deploy From Branch Jamison 
      <h1>Here's a line that will deploy from the org repo.</h1>
    </div>
  );
}

export default App;
