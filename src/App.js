import './App.css';
import AsemicScript from './sketches/asemic_script';
import Footer from  './components/Footer';
import Header from './components/Header';
import Inputs from './components/Inputs';
import Outputs from './components/Outputs';

function App() {
  return (
    <div className="App">

      <div className="Header">
        <Header /> 
      </div>

      <div className="Script">
        <AsemicScript />
      </div>

      <div className = "Parameters">
        <Inputs />
      </div>

      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
