import {Link} from 'react-router-dom';

const styledSection: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
};

const styledLink: React.CSSProperties = {
  display: 'block',
  padding: '9px 21px 9px 21px',
  fontSize: '19px',
  lineHeight: '1.211',
  fontWeight: '400',
  transform: 'skew(-15deg)',
  color: '#ffffff',
  backgroundColor: '#4481c3',
  borderRadius: '3px',
};

function NotFoundScreen(): JSX.Element {
  return (
    <section style={styledSection}>
      <h1>404. Page not found</h1>
      <Link to="/" style={styledLink}>Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundScreen;
