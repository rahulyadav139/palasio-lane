import './PageNotFound.css';
import { Link } from 'react-router-dom';

const PageNotFound = props => {
  return (
    <main className="main main-page-not-found">
      <h1>404</h1>
      <img
        className="img-responsive"
        src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
        alt="page-not-found"
      />
      <div className="flex col gap align-center page-not-found-details">
        <h3>Look like you're lost</h3>

        <p>the page you are looking for not available!</p>
        <Link to="/">
          <button className="btn primary">Home</button>
        </Link>
      </div>
    </main>
  );
};
export { PageNotFound };
