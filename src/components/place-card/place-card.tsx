import {Offer} from '../../types/offers';
import {Link, useNavigate} from 'react-router-dom';
import {calcRating} from '../../utils/utils';
import cn from 'classnames';
import {AppRoute, AuthorizationStatus, TypeOffer} from '../../const';
import { useMemo } from 'react';
import { changeFavoriteOfferStatusAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PlaceCardProps = {
  offer: Offer;
  variant: 'cities' | 'favorites' | 'near-places';
  handleCardMouseEnter?: (id: string) => void;
  handleCardMouseLeave?: () => void;
}

function PlaceCard({offer, variant, handleCardMouseEnter, handleCardMouseLeave}: PlaceCardProps): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const classList = useMemo(() => cn(
    `${variant}__card`,
    'place-card',
  ), [ variant ]);

  const imageClassList = useMemo(() => cn(
    `${variant}__image-wrapper`,
    'place-card__image-wrapper'
  ), [ variant ]);

  return (
    <article
      className={classList}

      onMouseEnter={() => {
        handleCardMouseEnter?.(offer.id);
      }}

      onMouseLeave={() => {
        handleCardMouseLeave?.();
      }}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div
        className={imageClassList}
      >
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={variant === 'favorites' ? '150' : '260'}
            height={variant === 'favorites' ? '110' : '200'}
            alt={offer.title}
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={cn(
              'place-card__bookmark-button',
              'button',
              {'place-card__bookmark-button--active': offer.isFavorite},
            )}
            type="button"

            onClick={() => {
              if (authorizationStatus !== AuthorizationStatus.Auth) {
                navigate(AppRoute.Login);
              }
              dispatch(changeFavoriteOfferStatusAction({
                offerId: offer.id,
                status: Number(!offer.isFavorite ? 1 : 0),
              }));
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: calcRating(offer.rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{TypeOffer[offer.type]}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
