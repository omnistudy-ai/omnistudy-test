import "./404.css"
import Navbar from './web/components/nav/Navbar';
import Footer from './web/components/footer/Footer';


export default function NotFound404() {
  return (
    <div className="notfound404" >
      <Navbar/>
        <h1 className="text">Sorry this page doesn't exist</h1>
      <Footer/>
    </div>
  );
}


