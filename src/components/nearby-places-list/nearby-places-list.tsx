import PlaceCard from '../place-card/place-card';
import {Offer} from '../../types/offers';

type NearbyPlacesListProps = {
  offers: Offer[] | null;
}

function NearbyPlacesList ({offers}: NearbyPlacesListProps): JSX.Element {

  return (
    <div className="near-places__list places__list">
      {offers?.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          variant={'near-places'}
        />
      ))}
    </div>
  );
}

export default NearbyPlacesList;
