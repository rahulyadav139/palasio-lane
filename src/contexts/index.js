import { AuthProvider } from './auth-context';
import { ModalProvider } from './modal-context';
import { BrowserRouter as Router } from 'react-router-dom';

const Providers = props => {
  return (
    <Router>
      <ModalProvider>
        <AuthProvider>{props.children}</AuthProvider>
      </ModalProvider>
    </Router>
  );
};

export default Providers;
