import './App.css';
import Homepage from './pages/Homepage';
import { AuthModal } from './components';
import { useAuthModal } from './contexts/auth-modal-context';

function App() {
  const { isAuthModal, resetModal, switchModal, isAuthTypeLogin } =
    useAuthModal();

  // console.log(resetModal);
  return (
    <div className="App">
      <Homepage />

      {isAuthModal && (
        <AuthModal
          onReset={resetModal}
          onSwitch={switchModal}
          isAuthTypeLogin={isAuthTypeLogin}
        />
      )}
    </div>
  );
}

export default App;
