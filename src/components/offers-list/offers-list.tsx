import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';

type OffersListProps = {
  offers: Offer[];
  handleCardMouseEnter?: (id: string) => void;
  handleCardMouseLeave?: () => void;
}

function OffersList ({offers, handleCardMouseEnter, handleCardMouseLeave}: OffersListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={'cities'}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;
