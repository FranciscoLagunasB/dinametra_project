// IMPORT ICONS
import "bootstrap-icons/font/bootstrap-icons.css";
import 'remixicon/fonts/remixicon.css'

// IMPORT BOOTSTRAP
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// IMPORTS
import './App.css';
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Sidebar />
      <Main />
      <Footer />
    </>
  );
}

export default App;
