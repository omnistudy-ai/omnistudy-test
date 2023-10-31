import "./404.css"
import Navbar from './web/components/nav/Navbar';

export default function NotFound404() {
  return (<div className="notfound404" >
      <Navbar/>
      <h1>Sorry this page doesn't exist</h1>
    </div>);
}

