import { AuthProvider } from './auth-context';
import { AuthModalProvider } from './auth-modal-context';
import { BrowserRouter as Router } from 'react-router-dom';

const Providers = props => {
  return (
    <Router>
      <AuthModalProvider>
        <AuthProvider>{props.children}</AuthProvider>
      </AuthModalProvider>
    </Router>
  );
};

export default Providers;
