import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';

type OffersListProps = {
  offers: Offer[] | null;
  handleCardMouseEnter?: (id: string) => void;
  handleCardMouseLeave?: () => void;
}

function NearbyPlacesList ({handleCardMouseEnter, handleCardMouseLeave, offers}: OffersListProps): JSX.Element {

  return (
    <div className="near-places__list places__list">
      {offers?.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={'near-places'}
          handleCardMouseEnter={handleCardMouseEnter}
          handleCardMouseLeave={handleCardMouseLeave}
        />
      ))}
    </div>
  );
}

export default NearbyPlacesList;
