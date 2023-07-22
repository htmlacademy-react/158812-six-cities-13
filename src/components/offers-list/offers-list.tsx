import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';

type OffersListProps = {
  offers: Offer[];
  handleCardMouse: (mousedOffer: Offer | null) => void;
  handleCardLeave: () => void;
}

function OffersList ({offers, handleCardMouse, handleCardLeave}: OffersListProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={'cities'}
          handleCardMouse={handleCardMouse}
          handleCardLeave={handleCardLeave}
        />
      ))}
    </div>
  );
}

export default OffersList;
