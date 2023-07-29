import PlaceCard from '../place-card/place-card';
import {useAppSelector} from '../../hooks';

type OffersListProps = {
  handleCardMouseEnter?: (id: string) => void;
  handleCardMouseLeave?: () => void;
}

function OffersList ({handleCardMouseEnter, handleCardMouseLeave}: OffersListProps): JSX.Element {

  const currentOffers = useAppSelector((state) => state.offers);

  return (
    <div className="cities__places-list places__list tabs__content">
      {currentOffers.map((offer) => (
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
