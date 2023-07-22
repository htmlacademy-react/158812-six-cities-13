import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';

type OffersListProps = {
  offers: Offer[];
  handleCardMouseEnter: (mousedOffer: Offer | null) => void;
  handleCardLeaveEnter: () => void;
}

function OffersList ({offers, handleCardMouseEnter, handleCardLeaveEnter}: OffersListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={'cities'}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardLeaveEnter={handleCardLeaveEnter}
        />
      ))}
    </div>
  );
}

export default OffersList;
