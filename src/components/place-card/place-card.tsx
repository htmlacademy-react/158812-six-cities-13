import {Offer} from '../../types/offers';
import {Link} from 'react-router-dom';
import { calcRating } from '../../utils/utils';
import { useState } from 'react';
import cn from 'classnames';

type PlaceCardProps = {
  offer: Offer;
  variant: 'cities' | 'favorites';
}

function PlaceCard({offer, variant}: PlaceCardProps): JSX.Element {

  const [activeCard, setActiveCard] = useState<string | undefined>(undefined);

  const handleMouseEnter = () => {
    setActiveCard(offer.id);
  };

  const handleMouseLeave = () => {
    setActiveCard(undefined);
  };

  return (
    <article
      className={cn(
        [`${variant}__card`],
        'place-card',
        {'place-card--active': activeCard === offer.id},
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}
      <div
        className={cn(
          [`${variant}__image-wrapper`],
          'place-card__image-wrapper'
        )}
      >
        <Link to={`/offer/:${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={variant === 'cities' ? '260' : '150'}
            height={variant === 'cities' ? '200' : '110'}
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
          <Link to={`/offer/:${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
