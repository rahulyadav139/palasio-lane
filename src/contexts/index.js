import { AuthProvider } from './auth-context';
import { BrowserRouter as Router } from 'react-router-dom';

const Providers = props => {
  return (
    <Router>
      <AuthProvider>{props.children}</AuthProvider>
    </Router>
  );
};

export default Providers;
