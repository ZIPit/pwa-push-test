import logo from './logo.svg';
import pwapic from './pwapic.jpg';
import './App.css';
import Notification from './components/notifications';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <Notification/> 
      <div>
        Hey! That's an app to test PWA Push!       
      </div>
        <img src={pwapic} className='App-image' alt='App-image' />

      </header>    
      
    </div>
    
    
    
  );
}

export default App;
