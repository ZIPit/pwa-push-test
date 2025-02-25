import logo from './logo.svg';
import pwapic from './pwapic.jpg';
import './App.css';
import Notification from './components/notifications';
import Token from './components/token';
import PwaModal from './components/pwaModal';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        Hey! That's an app to test PWA Push www!       
      </div>
      <PwaModal/>
      <Notification/> 
      <img src={pwapic} className='App-image' alt='App-image' />
      <div className='App-image'>
      <Token/>
      </div>
      
      </header>    
      
    </div>
    
    
    
  );
}

export default App;
