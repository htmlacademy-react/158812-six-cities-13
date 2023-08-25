import { Link } from 'react-router-dom';
import lcs from './not-found-screen.module.css';

function NotFoundScreen(): JSX.Element {
  return (
    <section className={lcs.el}>
      <h1>404. Page not found</h1>
      <Link to="/" className={lcs.link}>Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundScreen;
