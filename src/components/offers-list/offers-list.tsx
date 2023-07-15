import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
}

function OffersList ({offers}: OffersListProps): JSX.Element {

  const [activeCard, setActiveCard] = useState<string | undefined>(undefined);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          setActive={setActiveCard}
          activeCard={activeCard}
          variant={'cities'}
        />
      ))}
    </div>
  );
}

export default OffersList;
