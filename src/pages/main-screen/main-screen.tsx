import { useState } from 'react';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import TabsMemo from '../../components/tabs/tabs';
import { useAppSelector } from '../../hooks';
import PlacesSortingMemo from '../../components/places-sorting/places-sorting';
import { filterOffersByCity } from '../../utils/utils';
import { getOffers } from '../../store/app-data/selectors';
import { getSorting, getCity } from '../../store/app-process/selectors';
import HeaderMemo from '../../components/header/header';
import cn from 'classnames';
import OffersListEmpty from '../../components/offers-list-empty/offers-list-empty';

function MainScreen(): JSX.Element {

  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const handleCardMouseEnter = (id: string) => setSelectedPoint(id);
  const handleCardMouseLeave = () => setSelectedPoint(null);

  const currentOffers = useAppSelector(getOffers);
  const currentCity = useAppSelector(getCity);
  const sortOffers = useAppSelector(getSorting);
  const offersByCity = filterOffersByCity(currentOffers, currentCity, sortOffers);
  const city = offersByCity[0]?.city;

  return (
    <div className="page page--gray page--main">
      <HeaderMemo isUserBlock />

      <main
        className={cn(
          'page__main',
          'page__main--index',
          offersByCity.length === 0 ? 'page__main--index-empty' : ''
        )}
      >
        <h1 className="visually-hidden">Cities</h1>

        <TabsMemo currentCity={currentCity} />

        <div className="cities">
          {offersByCity.length === 0 ?
            <OffersListEmpty
              cityName={currentCity}
            />
            :
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersByCity.length} places to stay in {currentCity}</b>
                <PlacesSortingMemo sorting={sortOffers} />
                <OffersList
                  handleCardMouseEnter={handleCardMouseEnter}
                  handleCardMouseLeave={handleCardMouseLeave}
                  offers={offersByCity}
                />
              </section>
              <div className="cities__right-section">
                <Map
                  offers={offersByCity}
                  city={city}
                  selectedPoint={selectedPoint}
                  variant={'cities'}
                />
              </div>
            </div>}
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
