import logo from './logo.svg';
import './App.css';
import Notification from './components/notifications';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Notification/>
      <div>
        Hey! That's an app to test PWA Push! 
      </div>
      </header>
    </div>
  );
}

export default App;
