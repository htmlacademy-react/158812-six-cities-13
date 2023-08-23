import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';

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
  border: 'none',
  cursor: 'pointer',
};

export default function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <section style={styledSection}>
      <h2 className="error__text">Не удалось загрузить</h2>
      <button
        style={styledLink}
        onClick={() => {
          dispatch(fetchOffersAction());
        }}
        type="button"
      >
        Попробовать ещё раз
      </button>
    </section>
  );
}
