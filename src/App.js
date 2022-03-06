import './App.css';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';

function App() {
  return (
    <div className="App">
      <Header />
      {/* <LoginModal /> */}
      <SignupModal />
    </div>
  );
}

export default App;
