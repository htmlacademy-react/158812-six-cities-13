import {Offer} from '../../types/offers';
import {Link} from 'react-router-dom';
import {calcRating} from '../../utils/utils';
import cn from 'classnames';
import {TypeOffer} from '../../const';
import { useMemo } from 'react';
import BookmarkButton from '../bookmark-button/bookmark-button';

type PlaceCardProps = {
  offer: Offer;
  variant: 'cities' | 'favorites' | 'near-places';
  handleCardMouseEnter?: (id: string) => void;
  handleCardMouseLeave?: () => void;
}

function PlaceCard({offer, variant, handleCardMouseEnter, handleCardMouseLeave}: PlaceCardProps): JSX.Element {

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
          <BookmarkButton
            variant='place-card'
            width={18}
            height={19}
            offerId={offer.id}
            isFavorite={offer.isFavorite}
          />
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
