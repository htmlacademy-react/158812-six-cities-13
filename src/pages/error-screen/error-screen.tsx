import { useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-actions';

export default function ErrorScreen(): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <>
      <p className="error__text">Не удалось загрузить предложения</p>
      <button
        className="replay replay--error"
        onClick={() => {
          dispatch(fetchOffersAction());
        }}
        type="button"
      >
        Попробовать ещё раз
      </button>
    </>
  );
}
