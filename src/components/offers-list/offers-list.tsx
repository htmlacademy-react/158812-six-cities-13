import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
  variant: 'cities' | 'favorites';
}

function OffersList ({offers, variant}: OffersListProps): JSX.Element {

  const [activeCard, setActiveCard] = useState<string | undefined>(undefined);

  return (
    <div className={`${variant}__places-list places__list tabs__content`}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          setActive={setActiveCard}
          activeCard={activeCard}
          variant={variant}
        />
      ))}
    </div>
  );
}

export default OffersList;
