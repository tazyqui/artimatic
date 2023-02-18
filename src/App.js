import logo from './logo.svg';
import './App.css';
import AsemicScript from './sketches/asemic_script';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to react.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
        <AsemicScript />
      </header>
    </div>
  );
}

export default App;
