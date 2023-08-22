import cn from 'classnames';
import { AppRoute, AuthorizationStatus } from '../../const';
import { changeFavoriteOfferStatusAction } from '../../store/api-actions';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { useNavigate } from 'react-router-dom';

type BookmarkButtonProps = {
  offerId: string;
  isFavorite: boolean;
  variant: 'place-card' | 'offer';
  width: number;
  height: number;
  textIcon: string;
  checkAuth: 'is' | 'set';
}

function BookmarkButton({offerId, isFavorite, variant, width, height, textIcon, checkAuth}: BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const navigate = useNavigate();

  const classList = useMemo(() => cn(
    `${variant}__bookmark-button`,
    isFavorite ? `${variant}__bookmark-button--active` : null,
    'button',
  ), [ variant, isFavorite ]);

  const handleFavoriteStatusClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(changeFavoriteOfferStatusAction({
        offerId: offerId,
        status: Number(!isFavorite ? 1 : 0),
      }));
    } else {
      navigate(AppRoute.Login);
    }
  };

  const handleFavoriteStatusAuthorizationClick = () => {
    dispatch(changeFavoriteOfferStatusAction({
      offerId: offerId,
      status: Number(!isFavorite ? 1 : 0),
    }));
  };

  return (
    <button
      className={classList}
      type="button"

      onClick={() => {
        if (checkAuth === 'is') {
          handleFavoriteStatusClick();
        }

        if (checkAuth === 'set') {
          handleFavoriteStatusAuthorizationClick();
        }
      }}
    >
      <svg className={`${variant}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"/>
      </svg>
      <span className="visually-hidden">{textIcon}</span>
    </button>
  );
}

export default BookmarkButton;
